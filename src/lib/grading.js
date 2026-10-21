// Client side of the local grading API (see server/gradingApi.js).

export async function fetchAiStatus() {
  try {
    const res = await fetch('/api/status')
    if (!res.ok) return { ai: false }
    return await res.json()
  } catch {
    return { ai: false }
  }
}

export async function gradeEssay({ topic, question, answer }) {
  const res = await fetch('/api/grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topic,
      question: {
        prompt: question.prompt,
        code: question.code,
        parts: question.parts,
        modelAnswer: question.modelAnswer,
        keyPoints: question.keyPoints,
      },
      answer,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Grading failed (HTTP ${res.status})`)
  }
  return data
}

// Runs async jobs with at most `limit` running at the same time.
export async function runWithLimit(items, limit, worker) {
  let next = 0
  async function lane() {
    while (next < items.length) {
      const item = items[next++]
      await worker(item)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, lane))
}
