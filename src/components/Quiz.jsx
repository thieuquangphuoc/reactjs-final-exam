import { useEffect, useMemo, useRef, useState } from 'react'
import McqItem from './McqItem.jsx'
import EssayItem, { SmallButton } from './EssayItem.jsx'
import { loadJson, saveJson } from '../lib/storage.js'
import { shuffledOrder, newSeed } from '../lib/shuffle.js'
import { gradeEssay, runWithLimit } from '../lib/grading.js'

const MAX_MCQ = 20
const MAX_ESSAY = 10

function freshAttempt() {
  return { seed: newSeed(), mcq: {}, essays: {}, submitted: false, results: {} }
}

function loadAttempt(topicId) {
  const saved = loadJson(`wp1:quiz:${topicId}`, null)
  if (!saved || typeof saved.seed !== 'number') return freshAttempt()
  // A reload interrupts AI grading that was still running.
  const results = { ...saved.results }
  for (const id of Object.keys(results)) {
    if (results[id]?.status === 'grading') {
      results[id] = { status: 'error', error: 'Grading was interrupted (page reloaded).' }
    }
  }
  return { ...freshAttempt(), ...saved, results }
}

function formatScore(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0$/, '')
}

export default function Quiz({ topic, ai }) {
  const [attempt, setAttempt] = useState(() => loadAttempt(topic.id))
  const summaryRef = useRef(null)
  const aiEnabled = Boolean(ai?.ai)

  useEffect(() => {
    saveJson(`wp1:quiz:${topic.id}`, attempt)
  }, [topic.id, attempt])

  const orders = useMemo(
    () => Object.fromEntries(topic.mcq.map((q) => [q.id, shuffledOrder(q.options.length, attempt.seed, q.id)])),
    [topic.mcq, attempt.seed],
  )

  const mcqScore = topic.mcq.filter((q) => attempt.mcq[q.id] === q.answer).length
  const essayDone = topic.essays.filter((q) => attempt.results[q.id]?.status === 'done')
  const essayScore = essayDone.reduce((sum, q) => sum + attempt.results[q.id].score, 0)
  const essayPending = topic.essays.length - essayDone.length
  const answeredCount =
    topic.mcq.filter((q) => attempt.mcq[q.id] != null).length +
    topic.essays.filter((q) => (attempt.essays[q.id] || '').trim()).length
  const total = mcqScore + essayScore
  const isGrading = topic.essays.some((q) => attempt.results[q.id]?.status === 'grading')

  // Remember the latest complete result for the overview page.
  useEffect(() => {
    if (attempt.submitted && essayPending === 0) {
      saveJson(`wp1:score:${topic.id}`, { total, max: MAX_MCQ + MAX_ESSAY, at: Date.now() })
    }
  }, [attempt.submitted, essayPending, total, topic.id])

  function setResult(id, result) {
    setAttempt((prev) => ({ ...prev, results: { ...prev.results, [id]: result } }))
  }

  async function gradeWithAi(ids) {
    setAttempt((prev) => {
      const results = { ...prev.results }
      for (const id of ids) results[id] = { status: 'grading' }
      return { ...prev, results }
    })
    await runWithLimit(ids, 3, async (id) => {
      const question = topic.essays.find((q) => q.id === id)
      try {
        const data = await gradeEssay({ topic: topic.title, question, answer: attempt.essays[id] || '' })
        setResult(id, { status: 'done', by: 'ai', ...data })
      } catch (error) {
        setResult(id, { status: 'error', error: error.message })
      }
    })
  }

  function submit() {
    const unanswered = MAX_MCQ + MAX_ESSAY - answeredCount
    if (unanswered > 0 && !window.confirm(`${unanswered} question(s) are not answered. Submit anyway?`)) return

    const results = {}
    const toGrade = []
    for (const q of topic.essays) {
      const text = (attempt.essays[q.id] || '').trim()
      if (!text) {
        results[q.id] = { status: 'done', by: 'auto', score: 0, feedback: 'No answer was given.' }
      } else if (aiEnabled) {
        results[q.id] = { status: 'grading' }
        toGrade.push(q.id)
      } else {
        results[q.id] = { status: 'self' }
      }
    }
    setAttempt((prev) => ({ ...prev, submitted: true, results }))
    requestAnimationFrame(() => summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    if (toGrade.length) gradeWithAi(toGrade)
  }

  function restart() {
    if (!attempt.submitted && answeredCount > 0 && !window.confirm('Clear all your answers?')) return
    setAttempt(freshAttempt())
  }

  const failedIds = topic.essays.filter((q) => attempt.results[q.id]?.status === 'error').map((q) => q.id)

  return (
    <div>
      <div className="border border-line px-4 py-4 sm:px-5">
        <p>
          <strong className="font-semibold">{MAX_MCQ} multiple-choice</strong> questions (1 point each) +{' '}
          <strong className="font-semibold">{MAX_ESSAY} written</strong> questions (1 point each) ={' '}
          <strong className="font-semibold">30 points</strong>. Same format as the Moodle exam practice.
        </p>
        <p className="mt-2 text-muted">
          {aiEnabled ? (
            <>Written answers are graded by AI ({ai.model}) against a model answer from the slides, in steps of 0.25.</>
          ) : (
            <>
              AI grading is off, so you will grade your written answers yourself using the model answer. To turn it
              on, put your key in <code className="bg-soft px-1">.env</code> as{' '}
              <code className="bg-soft px-1">ANTHROPIC_API_KEY=...</code> and restart{' '}
              <code className="bg-soft px-1">npm run dev</code>.
            </>
          )}
        </p>
        <p className="mt-2 text-muted">The option order is shuffled for every new attempt. Your answers are saved in this browser.</p>
      </div>

      <div ref={summaryRef} className="scroll-mt-24">
        {attempt.submitted && (
          <ScoreSummary
            mcqScore={mcqScore}
            essayScore={essayScore}
            essayPending={essayPending}
            isGrading={isGrading}
            total={total}
            failedCount={failedIds.length}
            onRetryFailed={() => gradeWithAi(failedIds)}
            onRestart={restart}
            aiEnabled={aiEnabled}
          />
        )}
      </div>

      <h3 className="mt-10 font-semibold">Section A · Multiple choice</h3>
      <div className="mt-2">
        {topic.mcq.map((q, i) => (
          <McqItem
            key={q.id}
            number={i + 1}
            question={q}
            order={orders[q.id]}
            selected={attempt.mcq[q.id]}
            submitted={attempt.submitted}
            onSelect={(optionIndex) =>
              setAttempt((prev) => ({ ...prev, mcq: { ...prev.mcq, [q.id]: optionIndex } }))
            }
          />
        ))}
      </div>

      <h3 className="mt-10 font-semibold">Section B · Written answers</h3>
      <div className="mt-2">
        {topic.essays.map((q, i) => (
          <EssayItem
            key={q.id}
            number={topic.mcq.length + i + 1}
            question={q}
            value={attempt.essays[q.id] || ''}
            submitted={attempt.submitted}
            result={attempt.results[q.id]}
            onChange={(text) => setAttempt((prev) => ({ ...prev, essays: { ...prev.essays, [q.id]: text } }))}
            onRetry={() => gradeWithAi([q.id])}
            onSelfGrade={(score) =>
              setResult(q.id, score == null ? { status: 'self' } : { status: 'done', by: 'self', score })
            }
          />
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-6">
        {!attempt.submitted ? (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={submit}
              className="border border-ink bg-ink px-5 py-2 text-paper hover:bg-paper hover:text-ink"
            >
              Submit all and finish attempt
            </button>
            <SmallButton onClick={restart} disabled={answeredCount === 0}>
              Clear answers
            </SmallButton>
            <span className="text-muted">
              Answered {answeredCount} / {MAX_MCQ + MAX_ESSAY}
            </span>
          </div>
        ) : (
          <ScoreSummary
            mcqScore={mcqScore}
            essayScore={essayScore}
            essayPending={essayPending}
            isGrading={isGrading}
            total={total}
            failedCount={failedIds.length}
            onRetryFailed={() => gradeWithAi(failedIds)}
            onRestart={restart}
            aiEnabled={aiEnabled}
            compact
          />
        )}
      </div>
    </div>
  )
}

function ScoreSummary({ mcqScore, essayScore, essayPending, isGrading, total, failedCount, onRetryFailed, onRestart, aiEnabled, compact }) {
  const complete = essayPending === 0
  const percent = Math.round((total / 30) * 100)
  return (
    <div className={`${compact ? '' : 'mt-6'} border border-ink px-4 py-4 sm:px-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">Result</h3>
        <span className="text-xs uppercase tracking-wide text-muted">
          {complete ? 'All graded' : isGrading ? 'AI is grading written answers…' : `${essayPending} written answer(s) waiting for a grade`}
        </span>
      </div>
      <table className="mt-3 w-full max-w-md text-left">
        <tbody>
          <tr>
            <td className="py-1">Multiple choice</td>
            <td className="py-1 text-right">{mcqScore} / 20</td>
          </tr>
          <tr>
            <td className="py-1">Written answers</td>
            <td className="py-1 text-right">
              {formatScore(essayScore)} / 10{!complete && <span className="text-muted"> (so far)</span>}
            </td>
          </tr>
          <tr className="border-t border-line font-semibold">
            <td className="pt-2">Total</td>
            <td className="pt-2 text-right">
              {formatScore(total)} / 30{complete && <span className="font-normal text-muted"> · {percent}%</span>}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap gap-2">
        {failedCount > 0 && aiEnabled && <SmallButton onClick={onRetryFailed}>Retry failed AI grading ({failedCount})</SmallButton>}
        <SmallButton onClick={onRestart} disabled={isGrading}>
          Start a new attempt
        </SmallButton>
      </div>
    </div>
  )
}
