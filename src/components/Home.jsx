import { Link } from 'react-router'
import { topics } from '../data/topics.js'
import { loadJson } from '../lib/storage.js'

export default function Home({ ai }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6">
      <div className="text-xs uppercase tracking-wide text-muted">Web Programming I · University of Eastern Finland</div>
      <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Theory exam practice</h1>
      <p className="mt-4">
        Every tab follows the same plan. <strong className="font-semibold">Part 1</strong> is the theory from the course
        slides, kept complete but written in plainer words. <strong className="font-semibold">Part 2</strong> is a
        30-point exercise in the format of the Moodle exam practice: 20 multiple-choice questions and 10 written
        questions about a piece of code.
      </p>

      <h2 className="mt-10 font-semibold">Topics</h2>
      <ol className="mt-3 border-t border-line">
        {topics.map((topic, i) => {
          const last = loadJson(`wp1:score:${topic.id}`, null)
          return (
            <li key={topic.id} className="border-b border-line py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Link to={`/${topic.id}`} className="font-semibold underline underline-offset-4 hover:text-accent">
                  {i + 1}. {topic.title}
                </Link>
                <span className="text-xs uppercase tracking-wide text-muted">
                  {last ? `Last result ${Number(last.total.toFixed(2))} / ${last.max}` : 'Not attempted yet'}
                </span>
              </div>
              <p className="mt-1 text-muted">{topic.intro}</p>
              <p className="mt-1 text-xs text-muted">
                Slides: {topic.slides.join(' · ')} — {topic.theory.length} theory sections, {topic.mcq.length} + {topic.essays.length} questions
              </p>
            </li>
          )
        })}
      </ol>

      <h2 className="mt-10 font-semibold">How grading works</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 marker:text-muted">
        <li>Multiple choice: 1 point for the right option, checked instantly when you submit.</li>
        <li>Written answers: up to 1 point each, in steps of 0.25. Sub-questions (a, b, c) weigh the same.</li>
        <li>After submitting you see the explanation for every question and a model answer for every written one.</li>
      </ul>
      <div className="mt-4 border-l-2 border-accent py-1 pl-4">
        <div className="text-xs uppercase tracking-wide text-accent">AI grading</div>
        {ai == null ? (
          <p className="mt-1 text-muted">Checking…</p>
        ) : ai.ai ? (
          <p className="mt-1">
            On. Written answers are graded by <code className="bg-soft px-1">{ai.model}</code> through the local dev
            server. The API key stays on your computer.
          </p>
        ) : (
          <div className="mt-1 space-y-2">
            <p>Off. You can still practise: written answers are then self-graded against the model answer.</p>
            <p>To turn it on:</p>
            <ol className="list-decimal space-y-1 pl-6 marker:text-muted">
              <li>
                Get an API key at <span className="underline">console.anthropic.com</span>.
              </li>
              <li>
                Copy <code className="bg-soft px-1">.env.example</code> to <code className="bg-soft px-1">.env</code> and
                set <code className="bg-soft px-1">ANTHROPIC_API_KEY=...</code>
              </li>
              <li>
                Stop and restart <code className="bg-soft px-1">npm run dev</code>.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
