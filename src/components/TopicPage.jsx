import { useEffect, useState } from 'react'
import TheoryBlock from './TheoryBlock.jsx'
import Quiz from './Quiz.jsx'

function scrollToId(id) {
  // The URL hash is used by the router, so in-page links scroll with JavaScript.
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

export default function TopicPage({ topic, ai }) {
  const [sectionIds] = useState(() => [...topic.theory.map((s) => s.id), 'exercise'])
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [topic.id])

  const toc = (
    <nav aria-label="On this page">
      <div className="text-xs uppercase tracking-wide text-muted">Part 1 · Theory</div>
      <ol className="mt-2 space-y-1">
        {topic.theory.map((section, i) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => scrollToId(section.id)}
              className={`text-left text-sm leading-snug hover:text-ink ${active === section.id ? 'text-ink underline underline-offset-4' : 'text-muted'}`}
            >
              {String(i + 1).padStart(2, '0')} {section.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-5 text-xs uppercase tracking-wide text-muted">Part 2 · Exercise</div>
      <button
        type="button"
        onClick={() => scrollToId('exercise')}
        className={`mt-2 text-left text-sm hover:text-ink ${active === 'exercise' ? 'text-ink underline underline-offset-4' : 'text-muted'}`}
      >
        30-point quiz
      </button>
    </nav>
  )

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <header className="pt-10 pb-8">
        <div className="text-xs uppercase tracking-wide text-muted">Slides: {topic.slides.join(' · ')}</div>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{topic.title}</h1>
        <p className="mt-3 max-w-3xl text-muted">{topic.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToId(topic.theory[0].id)} className="border border-ink px-4 py-1.5 hover:bg-ink hover:text-paper">
            Part 1 · Theory
          </button>
          <button type="button" onClick={() => scrollToId('exercise')} className="border border-ink px-4 py-1.5 hover:bg-ink hover:text-paper">
            Part 2 · Exercise (30 pts)
          </button>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6">{toc}</div>
        </aside>

        <div className="min-w-0">
          <details className="mb-8 border border-line lg:hidden">
            <summary className="cursor-pointer px-4 py-2">Contents</summary>
            <div className="border-t border-line px-4 py-3">{toc}</div>
          </details>

          <div className="text-xs uppercase tracking-wide text-muted">Part 1</div>
          <h2 className="mt-1 text-xl font-semibold">Theory</h2>

          {topic.theory.map((section, i) => (
            <section key={section.id} id={section.id} className="mt-10 scroll-mt-20 border-t border-line pt-8">
              <div className="text-xs uppercase tracking-wide text-muted">
                {String(i + 1).padStart(2, '0')} · from {section.from}
              </div>
              <h2 className="mt-1 text-lg font-semibold">{section.title}</h2>
              <div className="max-w-3xl">
                {section.blocks.map((block, j) => (
                  <TheoryBlock key={j} block={block} />
                ))}
              </div>
            </section>
          ))}

          <section id="exercise" className="mt-16 scroll-mt-20 border-t-2 border-ink pt-8">
            <div className="text-xs uppercase tracking-wide text-muted">Part 2</div>
            <h2 className="mt-1 text-xl font-semibold">Exercise</h2>
            <div className="mt-4 max-w-3xl">
              <Quiz key={topic.id} topic={topic} ai={ai} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
