import Inline from './Inline.jsx'
import CodeBlock from './CodeBlock.jsx'
import { QuestionHeader } from './McqItem.jsx'

const SELF_SCORES = [0, 0.25, 0.5, 0.75, 1]

function headerFor(submitted, value, result) {
  if (!submitted) {
    return { label: value.trim() ? 'Answer saved · marked out of 1' : 'Not yet answered · marked out of 1', tone: 'muted' }
  }
  if (!result || result.status === 'grading') return { label: 'Grading…', tone: 'accent' }
  if (result.status === 'self') return { label: 'Waiting for your self-grade', tone: 'accent' }
  if (result.status === 'error') return { label: 'Not graded', tone: 'bad' }
  const tone = result.score >= 1 ? 'good' : result.score > 0 ? 'accent' : 'bad'
  return { label: `${result.score} / 1`, tone }
}

export default function EssayItem({ number, question, value, onChange, submitted, result, onRetry, onSelfGrade }) {
  const header = headerFor(submitted, value, result)
  const showModel = submitted && result && result.status !== 'grading'

  return (
    <div className="border-t border-line py-6">
      <QuestionHeader number={number} label={header.label} tone={header.tone} />

      <p className="mt-3">{question.prompt}</p>
      {question.code && <CodeBlock code={question.code} lineNumbers />}

      <p className="mt-3">Based on the given code, answer the questions:</p>
      <ol className="mt-2 space-y-1">
        {question.parts.map((part) => (
          <li key={part.label} className="flex gap-2">
            <span className="shrink-0">{part.label})</span>
            <span className="min-w-0">
              <Inline text={part.text} />
            </span>
          </li>
        ))}
      </ol>

      <label className="sr-only" htmlFor={`essay-${question.id}`}>
        Your answer to question {number}
      </label>
      <textarea
        id={`essay-${question.id}`}
        className="mt-4 block min-h-44 w-full resize-y border border-line bg-white px-3 py-2 leading-relaxed outline-none focus:border-ink disabled:bg-soft"
        placeholder={question.parts.map((part) => `${part.label}) ...`).join('\n')}
        value={value}
        disabled={submitted}
        onChange={(e) => onChange(e.target.value)}
      />

      {submitted && result?.status === 'grading' && (
        <p className="mt-3 text-accent">Grading with AI…</p>
      )}

      {submitted && result?.status === 'error' && (
        <div className="mt-4 border-l-2 border-bad py-1 pl-4">
          <div className="text-xs uppercase tracking-wide text-bad">AI grading failed</div>
          <p className="mt-1">{result.error}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <SmallButton onClick={onRetry}>Retry AI grading</SmallButton>
            <SmallButton onClick={() => onSelfGrade(null)}>Grade it myself</SmallButton>
          </div>
        </div>
      )}

      {submitted && result?.status === 'done' && (
        <div className={`mt-4 border-l-2 py-1 pl-4 ${result.score >= 1 ? 'border-good' : result.score > 0 ? 'border-accent' : 'border-bad'}`}>
          <div className="text-xs uppercase tracking-wide text-muted">
            {result.by === 'ai' ? `AI feedback · ${result.verdict}` : result.by === 'self' ? 'Self-graded' : 'Feedback'}
          </div>
          {result.feedback && <p className="mt-1">{result.feedback}</p>}
          {result.missing?.length > 0 && (
            <div className="mt-2">
              <div className="text-muted">Missing or wrong:</div>
              <ul className="list-disc pl-6 marker:text-muted">
                {result.missing.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {result.by === 'self' && (
            <button type="button" className="mt-2 text-sm text-accent underline underline-offset-2" onClick={() => onSelfGrade(null)}>
              Change my score
            </button>
          )}
        </div>
      )}

      {submitted && result?.status === 'self' && (
        <div className="mt-4 border-l-2 border-accent py-1 pl-4">
          <div className="text-xs uppercase tracking-wide text-accent">Grade yourself</div>
          <p className="mt-1">Compare your answer with the model answer below, then pick your score.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SELF_SCORES.map((score) => (
              <SmallButton key={score} onClick={() => onSelfGrade(score)}>
                {score}
              </SmallButton>
            ))}
          </div>
        </div>
      )}

      {showModel && (
        <details className="mt-4 border border-line" open={result.status === 'self'}>
          <summary className="cursor-pointer select-none px-3 py-2 text-muted hover:text-ink">Model answer and key points</summary>
          <div className="border-t border-line px-3 py-3">
            <ul className="space-y-2">
              {question.modelAnswer.map((m) => (
                <li key={m.label} className="flex gap-2">
                  <span className="shrink-0">{m.label})</span>
                  <span className="min-w-0">{m.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs uppercase tracking-wide text-muted">Key points the grader looks for</div>
            <ul className="mt-1 list-disc pl-6 marker:text-muted">
              {question.keyPoints.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
        </details>
      )}
    </div>
  )
}

export function SmallButton({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="border border-ink px-3 py-1 text-sm hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:hover:bg-transparent"
    >
      {children}
    </button>
  )
}
