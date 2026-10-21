import Inline from './Inline.jsx'
import CodeBlock from './CodeBlock.jsx'

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f']

export default function McqItem({ number, question, order, selected, submitted, onSelect }) {
  const isCorrect = selected === question.answer
  const name = `q-${question.id}`

  return (
    <div className="border-t border-line py-6">
      <QuestionHeader
        number={number}
        label={
          submitted
            ? isCorrect
              ? 'Correct · 1 / 1'
              : selected == null
                ? 'Not answered · 0 / 1'
                : 'Incorrect · 0 / 1'
            : selected == null
              ? 'Not yet answered · marked out of 1'
              : 'Answer saved · marked out of 1'
        }
        tone={submitted ? (isCorrect ? 'good' : 'bad') : 'muted'}
      />

      <p className="mt-3">
        <Inline text={question.q} />
      </p>
      {question.code && <CodeBlock code={question.code} lineNumbers />}

      <fieldset className="mt-3">
        <legend className="mb-2 text-muted">Select one:</legend>
        <div className="space-y-1">
          {order.map((optionIndex, position) => {
            const checked = selected === optionIndex
            const isAnswer = optionIndex === question.answer
            let tone = ''
            if (submitted && isAnswer) tone = 'text-good'
            else if (submitted && checked && !isAnswer) tone = 'text-bad'
            return (
              <label
                key={optionIndex}
                className={`flex cursor-pointer items-start gap-3 py-1 ${submitted ? 'cursor-default' : 'hover:bg-soft'} ${tone}`}
              >
                <input
                  type="radio"
                  name={name}
                  className="mt-[0.45rem] shrink-0"
                  checked={checked}
                  disabled={submitted}
                  onChange={() => onSelect(optionIndex)}
                />
                <span className="w-5 shrink-0">{LETTERS[position]}.</span>
                <span className="min-w-0">
                  {question.options[optionIndex]}
                  {submitted && isAnswer && <span className="ml-2 text-xs uppercase tracking-wide">correct answer</span>}
                  {submitted && checked && !isAnswer && <span className="ml-2 text-xs uppercase tracking-wide">your answer</span>}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {submitted && (
        <div className={`mt-4 border-l-2 py-1 pl-4 ${isCorrect ? 'border-good' : 'border-bad'}`}>
          <div className={`text-xs uppercase tracking-wide ${isCorrect ? 'text-good' : 'text-bad'}`}>
            Explanation
          </div>
          <p className="mt-1">
            <Inline text={question.explain} />
          </p>
        </div>
      )}
    </div>
  )
}

const TONES = { good: 'text-good', bad: 'text-bad', muted: 'text-muted', accent: 'text-accent' }

export function QuestionHeader({ number, label, tone = 'muted' }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h4 className="font-semibold">Question {number}</h4>
      <span className={`text-xs uppercase tracking-wide ${TONES[tone]}`}>{label}</span>
    </div>
  )
}
