# WP1 Exam Practice

Five tabs: **HTML & CSS**, **Accessibility & Bootstrap**, **Git & GitHub**, **JavaScript**, **React**.
Each tab has:

1. **Theory** – the content of the course slides (`src/slides_theory`), complete but in plainer words.
2. **Exercise** – 20 multiple-choice + 10 written questions = 30 points, in the format of the Moodle exam practice.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## AI grading for written answers (optional)

Written answers can be graded by Claude. The key is used only by the local dev server; it is never sent to the browser.

1. Get an API key at https://console.anthropic.com
2. `cp .env.example .env` and set `ANTHROPIC_API_KEY=...`
3. Restart `npm run dev`

Without a key the site still works: you grade your written answers yourself against the model answer.
The default grading model is `claude-opus-5-5`; set `ANTHROPIC_MODEL=claude-haiku-5-5` in `.env` for a much cheaper option.

## Where things are

- `src/data/*.js` – theory, questions, answers, model answers (one file per tab)
- `src/components/` – page, theory renderer, quiz
- `server/gradingApi.js` – the `/api/grade` endpoint added to the Vite dev server
