// Small helpers to describe theory content as data.
// Inline markup inside text: `code` and **bold**.

export const p = (text) => ({ type: 'p', text })
export const h = (text) => ({ type: 'h', text })
export const ul = (items) => ({ type: 'ul', items })
export const ol = (items) => ({ type: 'ol', items })
export const table = (head, rows) => ({ type: 'table', head, rows })

// Code block. Leading/trailing blank lines are removed.
export const code = (text, label) => ({ type: 'code', text: trimCode(text), label })

// "In plain words" box: a simpler re-explanation of the slide.
export const plain = (text) => ({ type: 'plain', text })

// "Exam tip" box: things that are easy to mix up.
export const tip = (text) => ({ type: 'tip', text })

export function trimCode(text) {
  return text.replace(/^\s*\n/, '').replace(/\s+$/, '')
}
