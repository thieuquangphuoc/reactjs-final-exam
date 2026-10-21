// Plain code block. With lineNumbers it looks like the code in the exam questions.

export default function CodeBlock({ code, label, lineNumbers = false }) {
  const lines = code.split('\n')
  return (
    <figure className="my-4 min-w-0">
      {label && <figcaption className="mb-1 text-xs uppercase tracking-wide text-muted">{label}</figcaption>}
      <div className="overflow-x-auto border border-line bg-soft">
        <pre className="px-4 py-3 text-[0.87rem] leading-relaxed">
          {lineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 inline-block w-6 shrink-0 select-none text-right text-muted">{i + 1}</span>
                <code className="whitespace-pre">{line || ' '}</code>
              </div>
            ))
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </figure>
  )
}
