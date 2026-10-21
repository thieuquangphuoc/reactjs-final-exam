import htmlCss from './htmlCss.js'
import accessibilityBootstrap from './accessibilityBootstrap.js'
import git from './git.js'
import javascript from './javascript.js'
import react from './react.js'

export const topics = [htmlCss, accessibilityBootstrap, git, javascript, react]

export function getTopic(id) {
  return topics.find((t) => t.id === id)
}
