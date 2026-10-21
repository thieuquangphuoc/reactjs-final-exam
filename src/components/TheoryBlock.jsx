import Inline from './Inline.jsx'
import CodeBlock from './CodeBlock.jsx'

function Note({ label, tone, text }) {
  const color = tone === 'tip' ? 'border-accent' : 'border-ink'
  const labelColor = tone === 'tip' ? 'text-accent' : 'text-muted'
  return (
    <div className={`my-4 border-l-2 ${color} py-1 pl-4`}>
      <div className={`text-xs uppercase tracking-wide ${labelColor}`}>{label}</div>
      <p className="mt-1">
        <Inline text={text} />
      </p>
    </div>
  )
}

export default function TheoryBlock({ block }) {
  switch (block.type) {
    case 'h':
      return <h3 className="mt-8 mb-2 font-semibold">{block.text}</h3>
    case 'p':
      return (
        <p className="my-3">
          <Inline text={block.text} />
        </p>
      )
    case 'ul':
      return (
        <ul className="my-3 list-disc space-y-1 pl-6 marker:text-muted">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="my-3 list-decimal space-y-1 pl-6 marker:text-muted">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      )
    case 'code':
      return <CodeBlock code={block.text} label={block.label} />
    case 'table':
      return (
        <div className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.93rem]">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} className="border border-line bg-soft px-3 py-2 align-top font-semibold">
                    <Inline text={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className="border border-line px-3 py-2 align-top">
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'plain':
      return <Note label="In plain words" tone="plain" text={block.text} />
    case 'tip':
      return <Note label="Exam tip" tone="tip" text={block.text} />
    default:
      return null
  }
}
