// Renders a string with light inline markup: `code` and **bold**.

const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*)/g

export default function Inline({ text }) {
  if (text == null) return null
  const parts = String(text).split(TOKEN)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return (
        <code key={i} className="bg-soft px-1 text-[0.93em]">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
      return (
        <strong key={i} className="font-semibold">
          <Inline text={part.slice(2, -2)} />
        </strong>
      )
    }
    return part
  })
}
