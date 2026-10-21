import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router'
import { topics, getTopic } from './data/topics.js'
import { fetchAiStatus } from './lib/grading.js'
import Home from './components/Home.jsx'
import TopicPage from './components/TopicPage.jsx'

function TopicRoute({ ai }) {
  const { topicId } = useParams()
  const topic = getTopic(topicId)
  if (!topic) return <Home ai={ai} />
  return <TopicPage key={topic.id} topic={topic} ai={ai} />
}

export default function App() {
  const [ai, setAi] = useState(null)

  useEffect(() => {
    fetchAiStatus().then(setAi)
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 sm:px-6 md:flex-row md:items-center md:gap-8">
          <Link to="/" className="shrink-0 pt-3 font-semibold md:py-4">
            WP1 Exam Practice
          </Link>
          <nav aria-label="Topics" className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <ul className="flex gap-6 whitespace-nowrap">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <NavLink
                    to={`/${topic.id}`}
                    className={({ isActive }) =>
                      `inline-block border-b-2 py-3 md:py-4 ${isActive ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`
                    }
                  >
                    {topic.short}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home ai={ai} />} />
          <Route path="/:topicId" element={<TopicRoute ai={ai} />} />
        </Routes>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          Based on the Web Programming I course slides (originally by Sonsoles López-Pernas, adapted by Maria Kuismin,
          UEF). For personal exam practice.
        </div>
      </footer>
    </div>
  )
}
