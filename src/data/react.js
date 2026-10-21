import { p, h, ul, ol, table, code, plain, tip, trimCode } from './blocks.js'

const theory = [
  {
    id: 'react-why',
    title: 'From UI problems to component thinking',
    from: '8 – React I',
    blocks: [
      h('What we did with plain JavaScript'),
      ul([
        "Manipulate the DOM directly: `getElementById`, `addEventListener`, `querySelector`.",
        "Build simple interactive elements: buttons, forms, menus.",
        "Handle dynamic data: update content on user actions.",
      ]),
      code(`
const btn = document.getElementById('myButton');
btn.addEventListener('click', () => {
  document.getElementById('content').innerText = 'Hello, World!';
});`),
      h('DOM manipulation gets difficult as apps grow'),
      ul([
        "More UI elements to manage and update.",
        "Hard to track which DOM parts need updating.",
        "State management across the app becomes error-prone.",
        "Code duplication – no structure for reusable parts (buttons, forms, cards).",
      ]),
      p("Result: **\"DOM spaghetti\"** – hard to read, test and maintain. Kažigram started simple (show posts, add, like, delete). Add comments, profiles, notifications, search, several pages... and with vanilla JS every feature adds more getElementById / addEventListener / innerHTML: the code grows uncontrollably, the same logic is repeated, and one change breaks something else."),
      h('UI as reusable components'),
      p("Solution: **split the UI into independent, reusable parts**. Each component:"),
      ul([
        "is devoted to **one specific task**",
        "receives data as input (**props**)",
        "returns a **user interface**",
      ]),
      p("This is the direction web development has taken: Web Components, Angular, React, Vue.js. In JavaScript it is very easy to create spaghetti – it's better to structure applications in modules."),
      h('From requirements to component design'),
      ol([
        "Read the requirements.",
        "Find **repeating patterns** → component candidates.",
        "Identify **what data each part needs** → props candidates.",
        "Identify **what changes over time** → state candidates.",
        "Draw the **component tree**.",
      ]),
      p("Ask yourself: What repeats? (each post looks the same) · What changes? (the like count) · What is separate? (adding a post is its own feature) · Who needs this data? (decides where state lives)."),
      h('Example: Kažigram'),
      p("Features: a feed of cat posts (photo, title, caption, like count), liking a post (count updates immediately), adding a post (title, caption, photo), deleting a post. Interface: one main view, a form for new posts, navigation between them."),
      code(`
App                    (the root, holds all posts)
  ├── Header           (logo, navigation)
  ├── PostList         (renders all PostCard components)
  │     └── PostCard (×many)   (photo, title, caption, like count)
  │           ├── LikeButton   (clicks update the count)
  │           └── DeleteButton (removes the post)
  └── PostForm         (form for a new post: title, caption, image URL)`),
      ul([
        "PostCard receives a post object → **props**.",
        "PostForm's input values → **component state** (only the form needs them).",
        "Like count: does it need to be saved? → App state. Only visual feedback? → component state.",
      ]),
      p("There is no single right answer – design decisions matter."),
    ],
  },
  {
    id: 'react-basics',
    title: 'Why React? Data binding, Virtual DOM',
    from: '8 – React I',
    blocks: [
      p("**React is a JavaScript library for building web and native user interfaces.**"),
      table(
        ['Framework', 'Year', 'Type'],
        [
          ['Angular', '2010/2016', 'full framework, runtime, TypeScript-first'],
          ['React', '2013', 'component library, runtime Virtual DOM'],
          ['Vue', '2014', 'lightweight framework, runtime'],
          ['Svelte', '2016', 'compiler-based framework, no Virtual DOM needed at runtime'],
        ],
      ),
      h('Data binding – two approaches'),
      table(
        ['One-way data binding', 'Two-way data binding'],
        [
          ['data flows in one direction only', 'data flows in both directions'],
          ['the application updates the UI; the UI cannot directly update application data', 'the application updates the UI and the UI automatically updates application data'],
          ['parent passes a value down, child emits an event/request up, parent updates its state', 'parent passes a value down, child changes it through the binding, both stay synchronized'],
          ['used by **React** and Vue (via props)', 'used by **Angular** and Vue (with v-model)'],
        ],
      ),
      p("Both keep the UI in sync with the data, and in both the parent owns the state. The difference: can the child only *request* a change, or can it sync changes back itself?"),
      h('Data flows one way – predictable'),
      ul([
        "**Data (props) flows down** from parent to child: App → PostList → PostCard. The parent decides what each child receives.",
        "**Events flow up** from child to parent: PostCard → PostList → App. The child notifies the parent (\"user clicked like\") and **the parent decides** what changes.",
        "Predictable and easier to debug.",
      ]),
      h('Virtual DOM – efficient updates'),
      ul([
        "**Without React** (vanilla JS) the developer decides manually which DOM element to update. Fine for simple apps, error-prone as complexity grows.",
        "**With React** the developer **describes what the UI should look like**. React compares the new Virtual DOM with the previous one (**diffing**) and **updates only the parts that changed**. You don't need to track which element changed.",
      ]),
      h("React's core ideas"),
      table(
        ['Idea', 'Benefit'],
        [
          ['Reusable components', 'less duplication – build once, use everywhere'],
          ['Virtual DOM', 'efficient updates – only what changed, not the whole page'],
          ['One-way data binding', 'predictable data flow – data down, events up'],
        ],
      ),
    ],
  },
  {
    id: 'react-jsx',
    title: 'Components and JSX',
    from: '8 – React I',
    blocks: [
      h('A component as a UI building block'),
      p("In React, a component:"),
      ul([
        "is a **function that returns the UI as JSX** (JavaScript XML)",
        "receives data as input (**props**)",
        "is **independent and reusable**",
      ]),
      p("Example: a shopping app splits into `<App>` → `<SearchBar/>` + `<ProductList/>` → many `<Product/>`."),
      h('Defining a component'),
      code(`
// Traditional function syntax
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function syntax (common in modern React)
const Welcome2 = (props) => {
  return <h1>Hello, {props.name}</h1>;
};`),
      p("Class components also exist but are **no longer recommended**."),
      code(`
// Greeting.jsx
function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}
export default Greeting;

// usage from another component:
<Greeting name="Toast" />

// result in the page:
// <div><h1>Hello, Toast!</h1><p>Welcome to React.</p></div>`),
      p("The returned element can be one or several HTML tags or other React components. Components are not just templates: they can have their own functions and features."),
      h('JSX = JavaScript + XML'),
      ul([
        "HTML is a specific version of XML with fixed tags: `<div>`, `<p>`, `<button>`, ...",
        "**XML** (eXtensible Markup Language) is a markup language for structured data where **you define your own tags**: `<book>`, `<cat>`.",
        "JSX borrows XML syntax because in React you write **your own tags** (components): `<LikeButton />`, `<App />`.",
        "A tag can have a name, attributes and children – only the name is required. A tag with no children is closed immediately with `/>`.",
      ]),
      code(`
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>`),
      h('JSX syntax rules'),
      ul([
        "**Component names start with an uppercase letter** (`ShoppingCart`, `PostCard`) – this sets them apart from HTML tags, which are always lowercase.",
        "**`class` → `className`**, because `class` is a reserved word in JavaScript. Likewise `for` → `htmlFor`.",
        "Event attributes are camelCase: `onClick`, `onChange`, `onSubmit`.",
      ]),
      code(`<div className="sidebar" />`),
      h('Components as custom HTML elements'),
      p("JSX lets you define custom tags (component name), custom attributes (props) and custom children (`props.children`)."),
      code(`
function MyButton(props) {
  return (
    <button
      style={{
        color: props.color,
        boxShadow: \`0 0 \${props.shadowSize}px gray\`,
        fontSize: props.fontSize
      }}
    >
      {props.children}
    </button>
  );
}

// usage:
<MyButton color="blue" shadowSize={2} fontSize="12px">Click Me</MyButton>

// compare with a plain HTML button:
<button style="color: blue; box-shadow: 0 0 2px gray; font-size: 12px;">Click Me</button>`),
      plain("`props.children` is whatever you put between the opening and closing tag – here the text \"Click Me\"."),
      h('JavaScript inside JSX: { }'),
      p("**Any JavaScript expression** can be used inside `{ }`: variables, calculations, function calls, ternary operators. It must be an **expression, not a statement** (no `if`, `for` inside the braces)."),
      code(`
function Greeting() {
  const name = "Kinsky";
  const isAdmin = true;
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Posts: {42 + 8}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}`),
      plain("`{isAdmin && <span>Admin</span>}`: if isAdmin is true the span is rendered, if false nothing is rendered."),
      h('Styling in React – three options'),
      code(`
// 1. External CSS file (same as before) – note className
import './App.css';
<div className="card">...</div>

// 2. Inline style as a JavaScript object – camelCase property names
const style = { backgroundColor: '#f0f0f0', color: '#333' };
<div style={style}>...</div>

// 3. Direct inline – double curly braces
<div style={{ backgroundColor: '#f0f0f0', color: '#333' }}>...</div>`),
      tip("In `style={{ ... }}` the **outer** braces = JSX expression, the **inner** braces = a JavaScript object. Property names are camelCase (`backgroundColor`, not `background-color`) because it is a JS object, not CSS."),
      h('Conditional styling and conditional rendering'),
      code(`
function SimpleBox(props) {
  return (
    <div style={{ display: props.show ? 'block' : 'none' }}>
      <p>This box is visible based on the "show" prop!</p>
    </div>
  );
}
<SimpleBox show={true} />   // visible
<SimpleBox show={false} />  // hidden

function Welcome(props) {
  return (
    <div>
      {props.loggedIn ? (
        <h1>Welcome back, user!</h1>
      ) : (
        <h1>Please log in to continue.</h1>
      )}
    </div>
  );
}`),
      h('JSX is transpiled to JavaScript by Babel'),
      p("**Browsers can only run vanilla JavaScript – not JSX.** Transpilation converts JSX to plain JS. This happens automatically in the background; you never write `React.createElement()` yourself."),
      code(`
// What we write (JSX)
function Hello() {
  return <span>Hello!</span>;
}

// What Babel produces (vanilla JS)
function Hello() {
  return React.createElement('span', null, 'Hello!');
  //                         1. type  2. props  3. children
}

// With a component and props:
<MyButton color="blue">Click Me</MyButton>
React.createElement(MyButton, { color: "blue" }, "Click Me");`),
      p("Babel works in three steps: 1) **Parse** the JSX source into an Abstract Syntax Tree (AST), 2) **Transform** the AST, 3) **Generate** vanilla JavaScript. With Vite this happens automatically on save."),
      tip("Summary: component = JS function returning JSX · JSX = XML-like syntax inside JS · uppercase tag = component, lowercase = HTML · Babel transpiles JSX to vanilla JS."),
    ],
  },
  {
    id: 'react-project',
    title: 'Starting a React project with Vite',
    from: '8 – React I',
    blocks: [
      h('Tools for starting'),
      table(
        ['Tool', 'Status'],
        [
          ['create-react-app', 'old-fashioned, deprecated – no longer recommended'],
          ['Vite', 'modern, frontend only – used in this course: fast dev server, HMR, production builds'],
          ['Next.js', 'modern, fullstack (frontend + backend) – when you need server-side rendering'],
        ],
      ),
      h('Creating the project'),
      p("Install **Node.js** first (it comes with **npm**, the package manager)."),
      code(`
$ npm create vite@latest
# Project name: my-app
# Select a framework: React
# Select a variant: JavaScript
# Install with npm and start now? Yes

  VITE ready
  ➜ Local:   http://localhost:5173/`),
      h('Project structure'),
      table(
        ['File / folder', 'Purpose'],
        [
          ['public/', 'static files'],
          ['src/', 'your code: App.jsx (main component), main.jsx (React entry point), App.css (component styles), index.css (global styles)'],
          ['.gitignore', 'what not to commit (Git lecture)'],
          ['index.html', 'the only HTML file you need'],
          ['package.json', 'dependencies and scripts'],
          ['vite.config.js', 'development configuration'],
          ['README.md', 'project description'],
        ],
      ),
      h('package.json'),
      table(
        ['Script', 'Does'],
        [
          ['npm run dev', 'starts the development server'],
          ['npm run build', 'creates the production files'],
          ['npm run lint', 'checks code quality (ESLint)'],
        ],
      ),
      ul([
        "**dependencies** – used in production, e.g. `react` and `react-dom` (connects React to the browser DOM).",
        "**devDependencies** – only used during development: `vite` (dev server + build tool), `eslint` (code quality), `@vitejs/plugin-react` (enables JSX in Vite).",
      ]),
      h('npm run dev and HMR'),
      p("`npm run dev` starts the dev server; open http://localhost:5173/. Edit src/App.jsx and see the change immediately."),
      p("**HMR – Hot Module Replacement** swaps, adds or removes modules **while the app is running, without reloading the page**. When you save a file the dev server detects the change, only the changed module is recreated, and the browser updates instantly – **without losing the current application state**."),
      h('Creating and using a component'),
      code(`
// 1. Create src/Greeting.jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
export default Greeting;

// 2. Import it in another component
import Greeting from './Greeting.jsx';

// 3. Use it like an HTML tag
<Greeting name="Sonsoles" />   // → Hello, Sonsoles`),
      h('Rendering many components with .map()'),
      code(`
import Greeting from './Greeting.jsx';

function App() {
  const names = ["Toast", "Naranja", "Ramona", "Kinsky"];
  return names.map((catName, i) =>
    <Greeting key={i} name={catName} />
  );
}
export default App;
// → Hello, Toast / Hello, Naranja / Hello, Ramona / Hello, Kinsky`),
      tip("`key` is **required when rendering lists**: it helps React track which item changed. Use a unique, stable value (like `post.id`) when you have one."),
      h('How it all fits together'),
      table(
        ['Setup chain', 'Development chain'],
        [
          ['Node.js – runs JavaScript outside the browser (comes with npm)', 'We write React components in JSX (.jsx files)'],
          ['npm – package manager that installs libraries (React, Vite, ...)', 'Vite serves the file'],
          ['Vite – dev server with hot reloading + production build tool', 'Babel transpiles JSX → vanilla JavaScript'],
          ['React + Babel', 'The browser runs vanilla JavaScript'],
        ],
      ),
      h('React Developer Tools'),
      ul([
        "A **browser extension** (Chrome Web Store / Firefox Add-ons: \"React Developer Tools\").",
        "Open your React app, press **F12**, and look for the new **\"Components\"** tab.",
        "It shows your app as a **component tree**, which components are rendered, and highlights a component in the page when you hover it.",
        "Click a component to see its **props** and **state**, and edit values live.",
        "When something looks wrong: open DevTools → find the component → check what it received and rendered → compare with what you expected. Check DevTools before asking for help.",
      ]),
    ],
  },
  {
    id: 'react-props',
    title: 'Props – making components configurable',
    from: '9 – React II',
    blocks: [
      ul([
        "**Props** (properties) are the properties of each instance of a component – the creation parameters.",
        "They are data given as **attributes** at render time. They can be any type: string, number, boolean, object, function, ...",
        "**Props are IMMUTABLE (read-only).** A component never modifies its own props.",
      ]),
      h('Passing props'),
      code(`
function PostCard(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.caption}</p>
      <p>❤️ {props.likes} likes</p>
    </div>
  );
}

<PostCard title="Toast's morning nap" caption="Sleeping in a sunbeam" likes={47} />
<PostCard title="Naranja on the windowsill" caption="Watching birds again" likes={23} />`),
      p("Props are passed as attributes, read as `props.title`, `props.likes`, ... Different instances of the same component can get different values: **one component, many variations**."),
      tip("Strings can be passed in quotes: `title=\"...\"`. Other JavaScript values (numbers, booleans, objects, functions, variables) need braces: `likes={47}`."),
      h('Destructuring props, default values, missing props'),
      code(`
function PostCard({ title, caption, likes = 0, imageUrl = null, imageAlt = "" }) {
  return (
    <div>
      {imageUrl && <img src={imageUrl} alt={imageAlt} />}  {/* only if imageUrl exists */}
      <h3>{title}</h3>
      <p>{caption}</p>
      <p>❤️ {likes} likes</p>
    </div>
  );
}

// imageUrl and imageAlt missing → no image, likes defaults to 0
<PostCard title="Naranja on the windowsill" caption="Watching birds again" />`),
      h('Callback props – functions as props'),
      p("Props can also be **functions** (callback props). They are used when a child needs to **notify the parent**. This is one-way data binding in practice: **data flows DOWN** (title, id), **events flow UP** (onDelete)."),
      code(`
function PostCard(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  );
}

// In the parent (App):
<PostCard title="Toast's morning" id={1} onDelete={(id) => deletePost(id)} />`),
      p("The parent passes a function down → the child calls it when something happens → **the parent decides what to do** with the event."),
    ],
  },
  {
    id: 'react-state',
    title: 'State and useState',
    from: '9 – React II',
    blocks: [
      h('State: information that changes over time'),
      ul([
        "State is extra information about the component that is **not given at render time** but **created and updated by the component itself**.",
        "Useful when a component must **remember information between renders**.",
        "State is mutable, but **cannot be modified directly**.",
        "Main feature: **the component re-renders every time its state changes**.",
        "State is what you would need to restore the app to exactly the same \"state\" (a frozen snapshot).",
      ]),
      table(
        ['Props', 'State'],
        [
          ['passed in from the parent', 'created inside the component'],
          ['read-only', 'changed with the setter function'],
          ['configure the component', 'remember changing data'],
        ],
      ),
      h('Two levels of state'),
      ul([
        "**Application state**: all the data you would save in a database or send to/get from an API (game status, shopping cart, posts). Usually the state of the root component `<App/>`.",
        "**Component state**: needed only for the UI, nothing to save or send (accordion open/closed, dropdown shown/hidden, unsaved form fields).",
      ]),
      h('Hooks'),
      p("**Hooks** are functions that let function components \"hook into\" React's state and lifecycle. They let us update state and run actions when things change. The most used: **useState** and **useEffect**."),
      h('useState'),
      code(`
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);   // state variable "count", starts at 0
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}`),
      ul([
        "`useState` returns a **pair**: the **current state value** and a **function to update it**.",
        "The argument (`0`) is the **initial state**, used for the first render.",
        "Every click calls `setCount`, which changes the state and makes React re-render.",
      ]),
      h('useState with objects'),
      code(`
const [cat, setCat] = useState({ name: "Toast", age: 6, color: "orange", isAsleep: true });

<button onClick={() => setCat({ ...cat, isAsleep: !cat.isAsleep })}>
  {cat.isAsleep ? "Wake up" : "Go to sleep"}
</button>`),
      plain("`{ ...cat, isAsleep: ... }` copies all properties of cat into a **new** object and overrides isAsleep. React sees a new object and re-renders. Changing `cat.isAsleep = true` directly would not be noticed."),
      h('State must be updated via the setter'),
      code(`
const [count, setCount] = useState(0);

count = count + 1;     // WRONG: React does not know about it → UI never updates
setCount(count + 1);   // RIGHT: React stores the new value → schedules a re-render → UI shows it`),
      plain("With `const` the wrong line even throws an error (a const cannot be reassigned). With `let` it runs, the variable changes silently, and React still does not re-render. Either way: only the setter updates the UI."),
      tip("React tracks state changes **only through the setter function**. Direct modification is invisible to React."),
      h('Which component should own the state?'),
      p("Rule: **state belongs to the lowest common ancestor of all components that need it.**"),
      ul([
        "Only one component needs the data → state in that component (component state).",
        "Several components need the same data → state in their **common parent** (**lift state up**).",
        "Kažigram: the posts list is needed by PostList AND PostForm → App. The form's input text is needed only by PostForm while typing → PostForm. The like count could be in LikeButton/PostCard, or in App if it is saved.",
      ]),
      h('Lifting state up'),
      code(`
function App() {
  const [posts, setPosts] = useState([]);   // state in App

  const addPost = (newPost) => {            // function in App
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <PostList posts={posts} />            {/* data flows down */}
      <PostForm onAddPost={addPost} />      {/* function flows down */}
    </div>
  );
}`),
      p("PostForm calls `props.onAddPost(newPost)` → the event flows up → App updates its state → re-render → PostList receives the new posts."),
    ],
  },
  {
    id: 'react-events',
    title: 'Events and controlled forms',
    from: '9 – React II',
    blocks: [
      h('Handling events in React'),
      code(`
// Vanilla JS: the handler is added separately
btn.addEventListener('click', handleClick);

// JSX: the handler is a prop, directly in the markup
<button onClick={handleClick}>Click me</button>`),
      ul([
        "Common event props: `onClick` (mouse click), `onChange` (input value changed), `onSubmit` (form submitted), `onMouseOver` (hover).",
        "**camelCase**: `onClick`, not `onclick`.",
      ]),
      code(`
<button onClick={handleClick}>       // RIGHT: passes the function
<button onClick={handleClick()}>     // WRONG: calls it immediately during render
<button onClick={() => handleClick(id)}>  // RIGHT: arrow function, called on click`),
      tip("Pass a **function reference**, not a function call. Use an arrow function when you need to pass an argument."),
      h('Events update state → React re-renders'),
      ol([
        "The user clicks the button.",
        "`onClick` calls `setCount(count + 1)`.",
        "React stores the new value.",
        "React re-renders the component.",
        "The UI shows the updated count.",
      ]),
      p("**UI = f(state)**: you describe what the UI looks like for any given state; React handles when and what to update."),
      h('One state update – all dependents re-render'),
      code(`
// Vanilla JS: you must update every place yourself
function addPost(newPost) {
  posts.push(newPost);
  header.textContent = posts.length + ' posts';
  postList.innerHTML = posts.map(renderCard).join('');
  sidebar.textContent = getMostActive(posts);
}

// React: update the state once, every component that uses it re-renders
function App() {
  const [posts, setPosts] = useState([]);
  return (
    <>
      <Header postCount={posts.length} />
      <PostList posts={posts} />
      <Sidebar posts={posts} />
    </>
  );
}`),
      h('Controlled forms – React owns the input value'),
      p("In plain HTML the **browser** stores the input value and you read it on submit. In React (a **controlled component**) the **state** owns the value:"),
      code(`<input value={name} onChange={(e) => setName(e.target.value)} />`),
      ol([
        "The user types → `onChange` fires with an event object `e`.",
        "`e.target` is the input element; `e.target.value` is what the user typed.",
        "`setName` updates the state → React re-renders → the input shows the new value.",
      ]),
      p("`value={name}` means: always show what is in state. **Without `value={name}` the input is \"uncontrolled\".**"),
      h('Form with select'),
      code(`
import { useState } from "react";

export default function CatSelector() {
  const [cat, setCat] = useState("");

  function handleChange(event) {
    setCat(event.target.value);
  }

  return (
    <div>
      {cat ? <p>Selected: {cat}</p> : <p>No cat selected</p>}
      <label>
        Choose a cat:
        <select value={cat} onChange={handleChange}>
          <option value="Toast">Toast</option>
          <option value="Naranja">Naranja</option>
        </select>
      </label>
    </div>
  );
}`),
      plain("`export default function Forms() { ... }` is the same as writing `function Forms() { ... }` and then `export default Forms;`."),
    ],
  },
  {
    id: 'react-effects',
    title: 'Side effects and useEffect',
    from: '9 – React II · 10 – React III',
    blocks: [
      table(
        ['useState', 'useEffect'],
        [
          ['stores data that changes', 'runs code at specific moments of the lifecycle'],
          ['"I need to remember a value between renders"', '"I need to do something WHEN something changes" or "ONCE when the component appears"'],
          ['when state changes, the component re-renders', 'reacts to changes / does work outside React'],
          ['e.g. like count, form input, open/closed toggle', 'e.g. update the page title, fetch data, set a timer'],
        ],
      ),
      p("A **side effect** is anything that reaches **outside React's rendering**: changing the browser (`document.title`, `localStorage`), setting up a timer or subscription, or **fetching data from a server**."),
      code(`
function PostList() {
  const [posts, setPosts] = useState([]);   // fetched data, starts as an empty array

  useEffect(() => {                          // runs after render
    const getData = async () => {
      const res = await fetch('https://api.example.com/posts');  // reaches OUTSIDE React
      const data = await res.json();
      setPosts(data);                        // brings the data in → re-render
    };
    getData();
  }, []);                                    // [] = run only once, when the component appears

  return posts.map(post => <PostCard key={post.id} title={post.title} />);
}`),
      h('The dependency array'),
      code(`
useEffect(() => {
  // runs after EVERY render
});

useEffect(() => {
  // runs only ONCE – when the component first appears (mounts)
}, []);

useEffect(() => {
  // runs when count changes
}, [count]);`),
      p("In practice you almost always include a dependency array – it prevents infinite loops."),
      h('Cleanup'),
      code(`
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('done');
  }, 1000);
  return () => clearTimeout(timer);   // cleanup function
}, []);`),
      plain("The function returned from the effect is a **cleanup**: React runs it when the component disappears (and before running the effect again), e.g. to stop a timer."),
    ],
  },
  {
    id: 'react-libraries',
    title: 'React component libraries',
    from: '9 – React II',
    blocks: [
      p("Same idea as UI component libraries and JS libraries, combined: **ready-made React components** for frequent needs (see awesome-react-components on GitHub)."),
      table(
        ['Library', 'For', 'Install'],
        [
          ['React Bootstrap', 'Bootstrap components as React components', 'npm install react-bootstrap bootstrap'],
          ['Material UI (MUI)', 'Material Design components', 'npm install @mui/material @emotion/react @emotion/styled'],
          ['Headless UI', 'unstyled, accessible components', 'npm install @headlessui/react'],
          ['react-beautiful-dnd', 'drag and drop', ''],
          ['Recharts', 'charts', ''],
          ['react-i18next', 'internationalization: a "dictionary" for all texts so the app adapts to different languages', ''],
        ],
      ),
      h('Adding a library to a React app'),
      ol([
        "Install it with npm: `npm install react-bootstrap bootstrap`",
        "Import the CSS in main.jsx or App.jsx: `import 'bootstrap/dist/css/bootstrap.min.css';`",
        "Import and use the components.",
      ]),
      code(`
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PostCard({ title, caption }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{caption}</Card.Text>
        <Button variant="primary">Like</Button>
      </Card.Body>
    </Card>
  );
}

// The same with plain Bootstrap classes:
// <div className="card"><div className="card-body"><h5 className="card-title">...`),
      h('GSAP in React: className vs. useRef'),
      code(`
// A) target the element by className
gsap.fromTo(".like-btn-" + id, { scale: 1 }, { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1 });
<Button className={"like-btn-" + id} onClick={handleLike}>♡ Like</Button>

// B) target the element by a reference to the DOM element
const likeRef = useRef(null);
gsap.fromTo(likeRef.current, { scale: 1 }, { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1 });
<Button ref={likeRef} onClick={handleLike}>♡ Like</Button>`),
      table(
        ['className', 'useRef'],
        [
          ['+ simple, uses what we already know', '+ precise, a direct reference to the DOM element'],
          ['− less precise, targets by CSS selector', '+ the React way, works reliably with many components'],
        ],
      ),
    ],
  },
  {
    id: 'react-fetch',
    title: 'Fetching data in React',
    from: '10 – React III',
    blocks: [
      h('useEffect + fetch – where and why'),
      p("In vanilla JS you can fetch anywhere (click handler, page load). **In React, fetch belongs inside useEffect.**"),
      p("Why? **The component function runs on every render.** A fetch directly in the component body causes an **infinite loop**: fetch → setProducts(data) → re-render → fetch again → ... `useEffect` with an empty dependency array breaks the loop: it runs exactly once, when the component first appears."),
      h('Two patterns for async fetch inside useEffect'),
      p("**useEffect cannot be async directly** – avoid `useEffect(async () => { ... })`. Instead:"),
      code(`
// Pattern A: async function defined INSIDE useEffect
useEffect(() => {
  const getData = async () => {
    const res = await fetch("https://...");
    const data = await res.json();
    setProducts(data);
  };
  getData();          // defined and called immediately
}, []);

// Pattern B: async function defined at component level
const getData = async () => {
  const res = await fetch("https://...");
  const data = await res.json();
  setProducts(data);
};
useEffect(() => {
  getData();          // called here, defined above
}, []);`),
      p("Both work. Pattern A keeps the fetch logic close to where it is used. Pattern B lets you call `getData` elsewhere too (e.g. a refresh button)."),
      h('Example with jsonbin.io'),
      code(`
function PostList() {
  const [posts, setPosts] = useState([]);   // empty array, not null: .map() needs an array

  const getData = async () => {
    const res = await fetch("https://api.jsonbin.io/v3/b/BIN_ID", {
      headers: { "X-Access-Key": import.meta.env.VITE_API_KEY }
    });
    const data = await res.json();
    setPosts(data.record);                  // jsonbin wraps the data in .record
  };

  useEffect(() => {
    getData();                              // called once on mount
  }, []);

  return (
    <div>
      {posts.map(post => <PostCard key={post.id} title={post.title} />)}
    </div>
  );
}`),
      h('Loading state and error handling'),
      code(`
function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);   // loading state
  const [error, setError] = useState(null);           // error state

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://api.example.com/posts');
        if (!res.ok) {
          throw new Error(\`HTTP error: \${res.status}\`);  // catch a bad status
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);     // store the error
      } finally {
        setIsLoading(false);       // always runs
      }
    };
    getData();
  }, []);

  if (isLoading) return <p>Loading...</p>;      // shown while loading
  if (error) return <p>Error: {error}</p>;      // shown if it failed
  return posts.map(post => <PostCard key={post.id} title={post.title} />);
}`),
      h('GET vs. POST in React'),
      code(`
// GET – fetch data when the component loads
useEffect(() => {
  getData();
}, []);

// POST – send data when the user submits a form
async function handleSubmit(event) {
  event.preventDefault();               // prevent the page reload
  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  });
  setPosts([...posts, newPost]);        // update the local state
}

<form onSubmit={handleSubmit}>          {/* React event handler */}`),
      tip("A function that uses `await` must be `async` – so the submit handler is `async function handleSubmit`."),
      h('Environment variables – keeping API keys out of Git'),
      ol([
        "Create a `.env` file in the project root: `VITE_API_KEY=your-api-key-here`",
        "Add `.env` to `.gitignore`.",
        "Use it in code: `const apiKey = import.meta.env.VITE_API_KEY;`",
      ]),
      p("In Vite, env variables **must start with `VITE_`**, otherwise they are not exposed to the browser code."),
      tip("⚠ `.env` keeps your key out of the Git history, but **not out of the browser**: after the build the key is inside the JavaScript and visible in the developer tools. Never commit `.env`."),
      p("Kažigram with jsonbin.io: GET posts when the app loads; PUT to save posts when the form is submitted or a post deleted (replaces the whole array); a loading spinner while fetching; an error notification if fetch fails; the API key in `.env`."),
    ],
  },
  {
    id: 'react-debug',
    title: 'Debugging React applications',
    from: '10 – React III',
    blocks: [
      h('Common React errors'),
      table(
        ['Error', 'Cause', 'Fix'],
        [
          ['"Cannot read properties of undefined (reading \'title\')"', 'a prop is missing or undefined', 'check the parent passed it; use optional chaining `props.post?.title` or a default value `post = {}`'],
          ['"Each child in a list should have a unique key"', '.map() is missing a key prop', '`<PostCard key={post.id} />`'],
          ['"Too many re-renders"', 'setState called during render, not in an event handler', 'move setState into onClick or useEffect'],
          ['"X is not defined" / blank screen', 'missing export default or wrong import path', 'check the file name matches the import exactly'],
          ['"Adjacent JSX elements must be wrapped in an enclosing tag"', 'return has several elements without a wrapper', 'wrap them in `<> </>` (fragment) or a `<div>`'],
        ],
      ),
      h('Network tab for API debugging'),
      p("DevTools (F12) → **Network** shows all requests. Filter by **Fetch/XHR** to see only API calls."),
      table(
        ['Status', 'Meaning'],
        [
          ['200', 'OK, the request succeeded'],
          ['404', 'the URL is wrong – check your endpoint'],
          ['401', 'Unauthorized – check your API key'],
          ['500', 'server error – problem on the API side'],
          ['CORS error', 'the API does not allow requests from your origin'],
        ],
      ),
      p("Click a request: **Headers** (URL, method, API key), **Preview** (parsed JSON), **Response** (raw text). When fetch returns nothing: open Network → find the request → check the status → read the Preview → compare the URL with the API docs."),
      h('CORS error (Cross-Origin Resource Sharing)'),
      p("\"Access to fetch at 'https://...' from origin 'http://localhost:5173' has been blocked by CORS policy\". The **browser** blocked the request because the API did not give permission for browser-to-API requests. It is a **browser security feature, not a code error**."),
      ol([
        "Check whether the API supports browser requests at all (some work only server-to-server).",
        "Check whether a required header is missing (e.g. jsonbin's key header, or `Authorization: Bearer token`).",
        "Check that you use the correct endpoint URL, and HTTPS vs HTTP.",
      ]),
      tip("CORS cannot be fixed by changing your React code alone – the permission must come from the API server."),
      h('A practical debugging checklist'),
      ol([
        "Read the error message in the Console (F12 → Console): it shows the component and line.",
        "React Developer Tools → Components → find the component; check props and state.",
        "If the problem is server data → Network tab → find the fetch → check status and response.",
        "Add `console.log` strategically: `console.log(\"posts:\", posts)`, `console.log(\"props:\", props)`.",
        "Isolate the problem: comment out parts, simplify to the minimum that still shows the bug.",
      ]),
    ],
  },
  {
    id: 'react-routing',
    title: 'SPA and routing with react-router',
    from: '10 – React III',
    blocks: [
      h('Single Page Applications'),
      table(
        ['Traditional page lifecycle', 'SPA lifecycle'],
        [
          ['initial request → the server sends HTML', 'initial request → the server sends HTML (the app)'],
          ['form POST → the server sends a whole new HTML page → page reload', 'AJAX request → the server sends only JSON data → no reload'],
        ],
      ),
      ul([
        "**Routing** gives users a multi-page experience in an SPA while staying within **one HTML document**.",
        "**Client-side routing** updates the URL from a link click **without requesting another document** from the server. The app immediately renders new UI and fetches data if needed.",
        "Faster, because the browser doesn't request a new document or re-evaluate CSS and JS for the next page.",
      ]),
      h('Router types'),
      table(
        ['Router', 'How / when'],
        [
          ['BrowserRouter', 'Most common. Uses the HTML5 history API (pushState, popState). Clean URLs, no #. Needs a server configured to send all non-asset requests to index.html.'],
          ['HashRouter', 'Uses the URL hash (#) to simulate routing. The part after # is not sent to the server, so no server configuration is needed. Good for static hosting like GitHub Pages. URLs look messier: http://example.com/#/about'],
          ['StaticRouter', 'server-side rendering (SSR), e.g. Next.js'],
          ['MemoryRouter', 'non-browser environments: React Native, tests, JavaScript-only apps'],
        ],
      ),
      p("Off-topic: React can also build native mobile apps (Android, iOS) with **React Native**."),
      h('Step 1: install'),
      code(`$ npm install react-router`),
      h('Step 2: set up the router in main.jsx'),
      code(`
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`),
      h('Step 3: define routes in App.jsx'),
      code(`
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Navbar />                {/* outside Routes → shown on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}`),
      h('Step 4: navigation links'),
      code(`
import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}`),
      tip("`<Link>` updates the URL **without reloading the page**. A normal `<a href>` would reload the whole page and break the SPA."),
      h('Conditional routes (e.g. authentication)'),
      code(`
{isAuthenticated
  ? <Navigate to="/posts" replace={true} />
  : <Home setAuthenticated={setAuthenticated} />}`),
      p("If the user is already logged in, send them to /posts; otherwise show the home page."),
      h('Organizing a larger React app'),
      code(`
src/
  components/      ← reusable components (used in several pages)
    PostCard.jsx
    PostForm.jsx
    Header.jsx
  pages/           ← one component per route
    Feed.jsx       ← route "/"
    NewPost.jsx    ← route "/new"
  App.jsx          ← routes defined here
  main.jsx         ← entry point`),
    ],
  },
  {
    id: 'react-deploy',
    title: 'Production build and deployment',
    from: '10 – React III',
    blocks: [
      h('From development to production'),
      p("During development `npm run dev` runs a dev server that transpiles JSX and hot-reloads the browser. When you are done you want **static files: HTML, CSS, JS + media**."),
      p("**`npm run build`** compiles, optimizes and bundles the code (JSX and other assets) into static files in the **`dist/`** folder. They can be deployed to any web server – **no JSX, no need for a server to transpile**."),
      h('Why use React if the output is vanilla JS?'),
      p("Same idea as other developer tools: Bootstrap is just CSS in the end, TypeScript is just JavaScript, React is just JavaScript. They make development **faster** (less code), **more structured** (reusable components), **more maintainable** (clearer code) and **less error-prone** (state management handled for us)."),
      h('Deploying to GitHub Pages'),
      ol([
        "With routing: use **HashRouter**, not BrowserRouter (BrowserRouter needs server configuration that GitHub Pages does not support).",
        "Add `base: \"/name-of-your-repo/\"` to vite.config.js.",
        "Run `npm run build`.",
        "Rename the `dist` folder to `docs`.",
        "On GitHub: Settings → Pages → Branch: main → Folder: /docs → Save.",
      ]),
      h('Deployment chain'),
      code(`
We wrote React components in JSX (.jsx files)
        ↓
npm run build (one time)
        ↓
Vite + Babel transpile everything once
        ↓
Static files: HTML, CSS, JS + assets
        ↓
Upload to a server
        ↓
The browser runs vanilla JavaScript (no Vite, no Babel needed)`),
    ],
  },
  {
    id: 'react-js',
    title: 'JavaScript in React: where JS ends and React begins',
    from: '11 – JavaScript in React',
    blocks: [
      p("**React code IS JavaScript.** React is a JavaScript library, and a React component is a JavaScript function. JSX is a convenience for the developer; the code that actually runs is plain JavaScript calling React's functions."),
      code(`
function PostCard({ title, caption, likes }) {          // JS: function + destructuring
  const [liked, setLiked] = useState(false);            // React: hook
  return (
    <div className="post-card" style={{ padding: 10, margin: 5 }}>   {/* JSX, className, style object */}
      <h3>{title}</h3>                                  {/* JSX interpolation */}
      <p>{caption}</p>
      <p>{likes} likes</p>
      <button onClick={() => setLiked(!liked)}>        {/* arrow function as event prop */}
        {liked ? "Unlike" : "Like"}                     {/* JS ternary */}
      </button>
    </div>
  );
}
export default PostCard;`),
      p("Babel turns all the JSX into `React.createElement()` calls. The `<div>` never reaches the browser as HTML; it becomes `React.createElement('div', { className: 'post-card', style: {...} }, ...)`."),
      h('JavaScript techniques you need in React'),
      table(
        ['Technique', 'Plain JS', 'In React'],
        [
          ['.map()', 'returns new values from an array', 'returns components from an array (+ key)'],
          ['spread ...', 'copies an object: `{ ...cat, age: 7 }`', 'immutable state updates: `setCat({ ...cat, isAsleep: true })`'],
          ['ternary ? :', 'short if/else', 'conditional rendering (if/else does not work inside JSX)'],
          ['destructuring', '`const { name, age } = cat;`', 'unpacking props: `function PostCard({ title, caption })`'],
          ['arrow functions', '`const twice = (x) => x * 2;`', 'callbacks: `onClick={() => handleClick(id)}`'],
          ['template literals', 'strings in backticks with ${...} placeholders', 'the same syntax inside JSX, e.g. an image src built from a file name'],
        ],
      ),
      code(`
const cat = { name: "Toast", age: 6 };

cat.isAsleep = true;               // WRONG in React: mutates the object
setCat(cat);                       // same object → React may not see a change

setCat({ ...cat, isAsleep: true }); // RIGHT: a new object`),
      code(`
const cat = { name: "Toast", age: 6, color: "orange" };
const { name, age, color } = cat;    // destructuring: unpack values into variables
console.log(name);                   // "Toast"

function PostCard(props) { return <h3>{props.title}</h3>; }   // without destructuring
function PostCard2({ title }) { return <h3>{title}</h3>; }    // with destructuring – same result`),
      code(`
const imagePath = \`/images/\${color}-\${isAsleep ? 'sleeping' : 'awake'}.png\`;
<img src={\`/cats/\${color}-\${isAsleep ? 'sleeping' : 'awake'}.png\`} alt={\`\${color} cat\`} />`, 'Template literals + ternary'),
      h('What is purely React?'),
      ul([
        "**Hooks** (useState, useEffect) – JavaScript has no hooks.",
        "**JSX syntax**: other names for reserved words (`className`, `htmlFor`), `{ }` to embed JS, camelCase events (`onClick`).",
        "**Uppercase vs. lowercase tags**: lowercase = HTML element (rendered as-is), Uppercase = React component (a function is called). Components contain HTML tags and other components.",
        "**Props and one-way data binding**: JS functions have arguments; React adds the convention data down via props, events up via callback props.",
        "**Virtual DOM and reconciliation**: in plain JS you find and update every element that depends on a value. In React, state changes trigger updates: your code produces a representation of the UI, React makes a virtual copy and calculates the minimum changes to the DOM.",
        "**The React ecosystem**: React Router (navigation between pages; plain JS uses browser navigation), component libraries (React Bootstrap, MUI, Headless UI), dev tools like Vite (transpile JSX; plain JS needs no transpiling).",
      ]),
      code(`
<!-- HTML -->
<div class="sidebar" onclick="handleClick()">
  <label for="name">Name</label>
</div>

// JSX
<div className="sidebar" onClick={handleClick}>
  <label htmlFor="name">Name</label>
</div>`),
      h('What is purely JavaScript?'),
      p("These work the same inside and outside React – they **return new values without modifying the original**:"),
      ul([
        "non-mutating array methods: `.map()`, `.filter()`, `.reduce()`, `.find()`",
        "spread operator, destructuring",
        "string methods, Math operations, timers",
        "`fetch()` and `async/await`",
        "debugging with `console.log`",
      ]),
      tip("Methods that **modify the original** (`.push()`, `.sort()`, `.reverse()`) work in plain JS but are **unsafe for React state** – use spread or new arrays instead: `setPosts([...posts, newPost])`."),
      h('The "border zone": JS that behaves differently in React'),
      ul([
        "`.map()` + `key` – `.map()` is JS, `key` is React (helps React track which element changed; without it React may re-render or misplace items).",
        "`event.preventDefault()` – the same function, but in a different context (`onSubmit` prop instead of addEventListener).",
        "Event naming: `onClick` (camelCase) in React vs `onclick` (lowercase) in HTML.",
        "`fetch()` – the same function, but it needs a `useEffect` wrapper because React runs the component function on every render.",
      ]),
      h('Same app, different approach'),
      code(`
<!-- Plain JavaScript -->
<form id="postForm">
  <input id="title" />
  <button type="submit">Post</button>
</form>
<div id="posts"></div>
<script>
  const form = document.getElementById('postForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const div = document.createElement('div');
    div.textContent = title;
    document.getElementById('posts').appendChild(div);
  });
</script>`),
      code(`
// React
function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, title]);
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Post</button>
      </form>
      {posts.map((p, i) => <div key={i}>{p}</div>)}
    </div>
  );
}`),
      table(
        ['', 'JavaScript', 'React'],
        [
          ['How you update the UI', 'you make DOM changes directly with code', 'your code produces a representation of the UI; React uses it to update the DOM'],
          ['DOM manipulation', 'manually (createElement, appendChild)', 'React does it for you (virtual DOM diffing)'],
          ['State', 'you track it yourself (variables)', 'useState tracks it and triggers a re-render'],
          ['Event handling', 'addEventListener separately', 'onClick, onSubmit as JSX props'],
        ],
      ),
      p("**What stayed the same?** .map(), .filter(), spread, ternary, arrow functions, template literals, fetch, async/await."),
      p("Learning React means learning new JavaScript patterns (hooks), a syntax extension (JSX) that transpiles back to JavaScript, and a component-based way of thinking. Everything you write is still JS."),
    ],
  },
]

const mcq = [
  {
    id: 're-m1',
    q: 'Why must React component names start with an uppercase letter?',
    options: [
      'Because JavaScript functions must start with an uppercase letter',
      'So React can tell components apart from HTML tags, which are lowercase',
      'Because Babel cannot transpile lowercase names',
      'It is only a style convention with no effect',
    ],
    answer: 1,
    explain: 'Lowercase tags are HTML elements rendered as-is; uppercase tags are components (a function is called).',
  },
  {
    id: 're-m2',
    q: 'Why does JSX use className instead of class?',
    options: [
      'Because class is a reserved word in JavaScript',
      'Because className is faster',
      'Because CSS classes are not supported in React',
      'Because class only works with Bootstrap',
    ],
    answer: 0,
    explain: 'JSX is JavaScript, and class is a reserved keyword. For the same reason for becomes htmlFor.',
  },
  {
    id: 're-m3',
    q: 'Which statement about props is correct?',
    options: [
      'A component should change its own props when data changes',
      'Props can only be strings',
      'Props are read-only values passed from the parent as attributes',
      'Props are created inside the component with useState',
    ],
    answer: 2,
    explain: 'Props are immutable (read-only) and can be any JS value. State is what a component creates and changes itself.',
  },
  {
    id: 're-m4',
    q: 'In const [count, setCount] = useState(0); what is 0?',
    options: ['The number of renders so far', 'The initial state value, used for the first render', 'The maximum value of count', 'The index of the state in the component'],
    answer: 1,
    explain: 'useState(initialValue) returns [currentValue, setterFunction]; the argument is the initial state.',
  },
  {
    id: 're-m5',
    q: 'A component has let [count, setCount] = useState(0); and its click handler runs count = count + 1; instead of calling setCount. What happens when the button is clicked?',
    options: [
      'The UI updates normally',
      'React re-renders the whole page',
      'The browser reloads the page',
      'The variable changes but React does not know about it, so the UI does not update',
    ],
    answer: 3,
    explain: 'React tracks state changes only through the setter function. Direct modification is invisible to React, so no re-render happens. (With const instead of let the line would even throw an error.)',
  },
  {
    id: 're-m6',
    q: 'What is wrong with <button onClick={handleClick()}>?',
    options: [
      'handleClick is called immediately during render instead of when the button is clicked',
      'Nothing; it is the recommended syntax',
      'onClick must be written onclick',
      'Event handlers must be strings in JSX',
    ],
    answer: 0,
    explain: 'Pass a function reference: onClick={handleClick}, or an arrow function: onClick={() => handleClick(id)}.',
  },
  {
    id: 're-m7',
    q: 'When does useEffect(() => { ... }, []) run?',
    options: ['After every render', 'Only once, when the component first appears', 'Every time any state changes', 'Never, an empty array disables it'],
    answer: 1,
    explain: '[] = run only once on mount. No array = after every render. [count] = when count changes.',
  },
  {
    id: 're-m8',
    q: 'When does useEffect(() => { ... }) with no dependency array run?',
    options: ['Only once on mount', 'Only when the component is removed', 'After every render', 'Only when props change'],
    answer: 2,
    explain: 'Without a dependency array the effect runs after every render, which can easily cause infinite loops with setState.',
  },
  {
    id: 're-m9',
    q: 'When fetching data from an API in a React component, where should the fetch call typically be placed?',
    options: [
      'Directly in the component body',
      'In a <script> tag inside the JSX',
      'Inside the useState initial value',
      'Inside a useEffect hook that runs when needed',
    ],
    answer: 3,
    explain: 'The component function runs on every render; fetching in the body causes fetch → setState → re-render → fetch ... an infinite loop.',
  },
  {
    id: 're-m10',
    q: 'Why does React need a key prop when rendering a list with .map()?',
    options: [
      'To sort the list alphabetically',
      'To help React track which item changed, was added or removed',
      'To make the items clickable',
      'To give each item a CSS class',
    ],
    answer: 1,
    explain: 'Without a key React may re-render or misplace items. Use a unique, stable value like post.id.',
  },
  {
    id: 're-m11',
    q: 'PostList and PostForm both need the posts array. Where should the posts state live?',
    options: [
      'In PostForm, because it creates new posts',
      'In both components, as two separate copies',
      'In their closest common parent (e.g. App), passed down as props',
      'In a global variable outside React',
    ],
    answer: 2,
    explain: 'State belongs to the lowest common ancestor of all components that need it ("lifting state up").',
  },
  {
    id: 're-m12',
    q: 'Which code makes the input a controlled component?',
    options: [
      '<input value={name} onChange={(e) => setName(e.target.value)} />',
      '<input defaultValue="Toast" />',
      '<input onClick={setName} />',
      '<input name="name" />',
    ],
    answer: 0,
    explain: 'value={name} shows what is in state, onChange updates state. Without value={...} the input is uncontrolled.',
  },
  {
    id: 're-m13',
    q: 'What does the Virtual DOM let React do?',
    options: [
      'Reload the whole page faster',
      'Run JavaScript on the server',
      'Store data permanently in the browser',
      'Compare the new and previous UI description and update only the parts of the DOM that changed',
    ],
    answer: 3,
    explain: 'React diffs the new Virtual DOM against the previous one and applies the minimum changes.',
  },
  {
    id: 're-m14',
    q: 'What does Babel do in a React project?',
    options: [
      'It transpiles JSX into vanilla JavaScript (React.createElement calls)',
      'It installs npm packages',
      'It hosts the app on GitHub Pages',
      'It checks the code style',
    ],
    answer: 0,
    explain: 'Browsers cannot run JSX. Babel parses, transforms and generates plain JS. npm installs packages, ESLint checks code quality.',
  },
  {
    id: 're-m15',
    q: 'You deploy a React app with routing to GitHub Pages. Which router should you use?',
    options: ['BrowserRouter', 'HashRouter', 'StaticRouter', 'MemoryRouter'],
    answer: 1,
    explain: 'BrowserRouter needs server configuration that GitHub Pages does not support. HashRouter keeps the route after #, which is not sent to the server.',
  },
  {
    id: 're-m16',
    q: 'Why use <Link to="/posts"> instead of <a href="/posts"> in a React SPA?',
    options: [
      'Link opens the page in a new tab',
      'Link sends the request to the server faster',
      'Link changes the URL and view without reloading the page',
      'There is no difference',
    ],
    answer: 2,
    explain: 'Client-side routing: Link updates the URL without requesting a new document. <a href> reloads the whole page.',
  },
  {
    id: 're-m17',
    q: 'In a Vite project, how must an environment variable be named and read in browser code?',
    options: [
      'API_KEY, read with process.env.API_KEY',
      'Any name, read with window.env',
      'REACT_APP_API_KEY, read with import.meta.API_KEY',
      'VITE_API_KEY, read with import.meta.env.VITE_API_KEY',
    ],
    answer: 3,
    explain: 'In Vite, variables must start with VITE_ to be exposed to the browser, and are read through import.meta.env.',
  },
  {
    id: 're-m18',
    q: 'A component returns <h1>Hi</h1><p>Text</p> and you get "Adjacent JSX elements must be wrapped in an enclosing tag". How do you fix it?',
    options: [
      'Wrap both elements in a fragment <> </> or a <div>',
      'Add a key to each element',
      'Move the <p> into a useEffect',
      'Rename the component with a lowercase letter',
    ],
    answer: 0,
    explain: 'A component must return one root element. A fragment <></> groups elements without adding extra HTML.',
  },
  {
    id: 're-m19',
    q: 'The state is cat = { name: "Toast", isAsleep: true }. Which update is correct?',
    options: [
      'cat.isAsleep = false;',
      'setCat(cat.isAsleep = false);',
      'setCat({ ...cat, isAsleep: false });',
      'cat = { ...cat, isAsleep: false };',
    ],
    answer: 2,
    explain: 'Create a new object with spread and pass it to the setter. Mutating the object directly is not detected by React.',
  },
  {
    id: 're-m20',
    q: 'Whether an accordion section is open or closed is needed only by that accordion and never saved. What kind of state is it?',
    options: [
      'Application state, kept in App',
      'Component state, kept in the accordion component',
      'A prop that the accordion changes itself',
      'An environment variable',
    ],
    answer: 1,
    explain: 'Component state = UI-only data (accordion open/closed, dropdown shown). Application state = data you would save or send to an API.',
  },
]

const essays = [
  {
    id: 're-e1',
    prompt: 'Consider the following code:',
    code: trimCode(`
function PostCard({ title, caption, likes = 0, imageUrl = null }) {
  return (
    <div className="post-card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h3>{title}</h3>
      <p>{caption}</p>
      <p>❤️ {likes} likes</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <PostCard title="Toast's nap" caption="Sunbeam" likes={47} imageUrl="toast.jpg" />
      <PostCard title="Naranja" caption="Watching birds" />
    </div>
  );
}`),
    parts: [
      { label: 'a', text: 'What does { title, caption, likes = 0, imageUrl = null } on line 1 mean?' },
      { label: 'b', text: 'What is rendered for the second PostCard (line 16)?' },
      { label: 'c', text: 'What does line 4 do? Why is likes={47} written with braces but title="..." with quotes?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Destructuring the props object in the parameter list: title, caption, likes and imageUrl become variables directly (instead of props.title, ...). likes = 0 and imageUrl = null are default values used when the prop is not passed.' },
      { label: 'b', text: 'A div with class post-card containing <h3>Naranja</h3>, <p>Watching birds</p> and <p>❤️ 0 likes</p>. No image, because imageUrl is missing (default null), and likes uses the default 0.' },
      { label: 'c', text: 'Line 4 is conditional rendering with &&: the <img> is rendered only if imageUrl has a value; otherwise nothing is rendered. Strings can be passed in quotes; other JavaScript values (numbers, booleans, variables, objects, functions) must be passed inside { } as JS expressions, so 47 stays a number.' },
    ],
    keyPoints: [
      'destructuring props in the parameter list',
      'default values when a prop is missing',
      'second card: Naranja, Watching birds, 0 likes, no image',
      '&& renders the img only if imageUrl exists',
      'quotes for strings, braces for JS expressions/numbers',
    ],
  },
  {
    id: 're-e2',
    prompt: 'Consider the following code:',
    code: trimCode(`
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}`),
    parts: [
      { label: 'a', text: 'What does useState return, and what is the 0?' },
      { label: 'b', text: 'Describe step by step what happens when the user clicks the button.' },
      { label: 'c', text: 'Why would count = count + 1 not work, and why is it fine that count is declared with const?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'useState returns a pair: the current state value (count) and a setter function to update it (setCount). 0 is the initial state used on the first render.' },
      { label: 'b', text: 'The onClick handler runs and calls setCount(count + 1). React stores the new value and schedules a re-render. The Counter function runs again, count now has the new value, and the paragraph shows the updated number (UI = f(state)).' },
      { label: 'c', text: 'React only tracks changes made through the setter; changing the variable directly is invisible to React, so the UI would never update (and a const cannot be reassigned anyway). const is fine because we never reassign count: each render gets a fresh count from useState.' },
    ],
    keyPoints: [
      'useState returns [value, setter]',
      '0 = initial state',
      'click → setCount → React stores value → re-render → new UI',
      'direct change is invisible to React, UI does not update',
      'const ok: new value each render via useState',
    ],
  },
  {
    id: 're-e3',
    prompt: 'Consider the following code:',
    code: trimCode(`
function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <PostList posts={posts} />
      <PostForm onAddPost={addPost} />
    </div>
  );
}`),
    parts: [
      { label: 'a', text: 'Why is the posts state in App and not in PostList or PostForm?' },
      { label: 'b', text: 'Describe how data and events flow between App, PostForm and PostList when a new post is added.' },
      { label: 'c', text: 'Why is setPosts([...posts, newPost]) used instead of posts.push(newPost)?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Both PostList (shows posts) and PostForm (adds posts) need the posts data. State belongs to the lowest common ancestor of the components that need it, so it is lifted up to App, their common parent.' },
      { label: 'b', text: 'App passes posts down to PostList as a prop (data flows down) and passes the addPost function down to PostForm as a callback prop. When the form is submitted, PostForm calls props.onAddPost(newPost) (event flows up). App updates the state with setPosts, React re-renders, and PostList receives the new posts array. This is one-way data binding.' },
      { label: 'c', text: 'push modifies the existing array, and React does not notice a change because it is the same array and no setter was called. The spread creates a new array with the old posts plus the new one, and setPosts tells React to re-render. State must be updated immutably through the setter.' },
    ],
    keyPoints: [
      'both components need posts → common parent App (lifting state up)',
      'posts passed down as a prop',
      'addPost passed down as a callback prop, called by PostForm (event up)',
      'App updates state → re-render → PostList gets new data',
      'push mutates the same array; React needs a new array via the setter',
    ],
  },
  {
    id: 're-e4',
    prompt: 'Consider the following code:',
    code: trimCode(`
function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://api.example.com/posts');
        if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return posts.map(post => <PostCard key={post.id} title={post.title} />);
}`),
    parts: [
      { label: 'a', text: 'Why is the fetch placed inside useEffect, and what does the empty array [] on line 20 do?' },
      { label: 'b', text: 'Explain the three state variables and what the user sees in each situation.' },
      { label: 'c', text: 'Why is an async function getData defined inside the effect instead of writing useEffect(async () => ...)?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Fetching is a side effect (it reaches outside React). The component function runs on every render, so a fetch directly in the body would cause an infinite loop: fetch → setPosts → re-render → fetch again. useEffect runs after rendering, and [] makes it run only once, when the component first appears.' },
      { label: 'b', text: 'posts holds the fetched data (starts as an empty array so .map() works). isLoading starts true, so "Loading..." is shown; finally sets it to false whether the request succeeded or failed. error stays null on success; if the fetch or a bad status (!res.ok) throws, catch stores the message and "Error: ..." is shown. On success the list of PostCards is rendered.' },
      { label: 'c', text: 'The effect function itself cannot be async (an async function returns a promise, but useEffect expects nothing or a cleanup function). So an async function is defined inside the effect and called immediately.' },
    ],
    keyPoints: [
      'fetch is a side effect; body runs every render → infinite loop',
      '[] = run once on mount',
      'isLoading → Loading..., finally sets false',
      'error → Error message via catch',
      'success → posts rendered (empty array initial for .map)',
      'useEffect callback cannot be async; define async function inside and call it',
    ],
  },
  {
    id: 're-e5',
    prompt: 'Consider the following code:',
    code: trimCode(`
function PostForm({ onAddPost }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({ id: Date.now(), title: title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Post</button>
    </form>
  );
}`),
    parts: [
      { label: 'a', text: 'What makes the input on line 13 a "controlled" input?' },
      { label: 'b', text: 'What happens when the user types a letter, and what happens when the form is submitted?' },
      { label: 'c', text: 'Why are htmlFor and onSubmit used instead of the HTML attributes for and onsubmit? What does e.preventDefault() do?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Its value comes from React state (value={title}) and every change goes through onChange → setTitle. React, not the browser, controls what the input shows.' },
      { label: 'b', text: 'Typing fires onChange with an event object; e.target.value is the current text; setTitle updates the state, React re-renders and the input shows the new value. On submit, handleSubmit prevents the page reload, calls the callback prop onAddPost with a new post object (the event flows up to the parent), and clears the input by setting title to "".' },
      { label: 'c', text: 'JSX is JavaScript: for is a reserved word, so it becomes htmlFor (like class → className), and React event props are camelCase (onSubmit, onClick). e.preventDefault() stops the browser\'s default form submission, which would reload the page and lose the React state.' },
    ],
    keyPoints: [
      'value={title} + onChange → state owns the value',
      'typing: onChange → e.target.value → setTitle → re-render',
      'submit: preventDefault, onAddPost(newPost) to parent, clear title',
      'htmlFor because for is reserved; camelCase event props',
      'preventDefault stops page reload',
    ],
  },
  {
    id: 're-e6',
    prompt: 'Consider the following code:',
    code: trimCode(`
// main.jsx
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);

// App.jsx
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Feed</Link>
        <Link to="/new">New post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    </div>
  );
}`),
    parts: [
      { label: 'a', text: 'What happens when the user clicks "New post"?' },
      { label: 'b', text: 'Why is <Link> used instead of <a href>, and why is <nav> placed outside <Routes>?' },
      { label: 'c', text: 'Why would HashRouter be chosen instead of BrowserRouter if the app is published on GitHub Pages?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The URL changes to .../#/new without a page reload. The router matches path "/new" and renders the <NewPost /> component in place of <Feed />. This is client-side routing in a Single Page Application.' },
      { label: 'b', text: 'Link updates the URL and the view without requesting a new document from the server; <a href> would reload the whole page and break the SPA (state lost). The nav is outside Routes so it is shown on every page.' },
      { label: 'c', text: 'BrowserRouter uses clean URLs and needs a server configured to send all routes to index.html, which GitHub Pages does not support (it would give 404 on refresh). HashRouter keeps the route after the #, which is not sent to the server, so no server configuration is needed.' },
    ],
    keyPoints: [
      'URL changes without reload, NewPost rendered',
      'client-side routing / SPA',
      'Link vs a href: no full page reload',
      'nav outside Routes → on every page',
      'BrowserRouter needs server config; GitHub Pages cannot',
      'HashRouter: part after # not sent to server',
    ],
  },
  {
    id: 're-e7',
    prompt: 'Consider the following code:',
    code: trimCode(`
function CatList({ cats, loggedIn }) {
  return (
    <div>
      {loggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
      <ul>
        {cats.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}`),
    parts: [
      { label: 'a', text: 'Explain line 4. Why is a ternary used instead of an if/else statement?' },
      { label: 'b', text: 'What do lines 6–8 do, and why is key={cat.id} there?' },
      { label: 'c', text: 'Which parts of this code are plain JavaScript and which are React/JSX specific?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Conditional rendering: if loggedIn is true it renders "Welcome back!", otherwise "Please log in.". Inside { } in JSX only expressions are allowed; if/else is a statement, so it does not work there, but the ternary condition ? a : b is an expression.' },
      { label: 'b', text: '.map() goes through the cats array and returns one <li> element per cat, showing its name. key gives each item a unique, stable identity so React can track which item changed, was added or removed; without it React warns and may re-render or misplace items.' },
      { label: 'c', text: 'Plain JS: the function, destructuring of props ({ cats, loggedIn }), the ternary operator, .map() and the arrow function. React/JSX: the JSX tags, { } for embedding JS, className-style attributes, the key prop, and the component itself as a reusable piece receiving props.' },
    ],
    keyPoints: [
      'ternary = conditional rendering',
      'if/else is a statement, not allowed inside JSX { }',
      'map returns one li per cat',
      'key helps React track list items',
      'JS: function, destructuring, ternary, map, arrow function',
      'React: JSX, {} interpolation, key, props',
    ],
  },
  {
    id: 're-e8',
    prompt: 'Two components produce errors in the browser console:',
    code: trimCode(`
function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1);
  return <p>{count}</p>;
}

function CatList({ cats }) {
  return (
    <ul>
      {cats.map(cat => <li>{cat.name}</li>)}
    </ul>
  );
}`),
    parts: [
      { label: 'a', text: 'Counter crashes with "Too many re-renders". Why?' },
      { label: 'b', text: 'CatList gives the warning "Each child in a list should have a unique key". How do you fix it?' },
      { label: 'c', text: 'Where should setCount be called instead? Give an example.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'setCount is called directly during render (at the top level of the component). Updating state triggers a re-render, which calls setCount again, which triggers another re-render... an infinite loop that React stops with the error.' },
      { label: 'b', text: 'Give each <li> created by .map() a unique key, e.g. <li key={cat.id}>{cat.name}</li> (an index can be used if there is no id).' },
      { label: 'c', text: 'In an event handler or in useEffect, e.g. <button onClick={() => setCount(count + 1)}>+1</button>, so the state changes only when the user clicks.' },
    ],
    keyPoints: [
      'setState during render → re-render → setState again → infinite loop',
      'add key prop to the li in map (key={cat.id})',
      'call setCount in an event handler (onClick) or useEffect',
    ],
  },
  {
    id: 're-e9',
    prompt: 'Consider the following code:',
    code: trimCode(`
function TitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => console.log('done'), 1000);
    return () => clearTimeout(timer);
  }, []);

  return <button onClick={() => setCount(count + 1)}>Click</button>;
}`),
    parts: [
      { label: 'a', text: 'What is a side effect? Which side effects are in this component?' },
      { label: 'b', text: 'When does each of the two useEffect calls run?' },
      { label: 'c', text: 'Explain the difference between useState and useEffect, using this component as the example.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'A side effect is anything that reaches outside React\'s rendering, such as changing the browser, setting a timer or fetching data. Here: changing document.title (the browser tab title) and setting a timer with setTimeout.' },
      { label: 'b', text: 'The first effect runs after the first render and again whenever count changes ([count]). The second runs only once when the component appears ([]); its returned function (cleanup) clears the timer when the component is removed.' },
      { label: 'c', text: 'useState stores data that changes and must be remembered between renders (count); changing it re-renders the component. useEffect runs code at specific moments of the lifecycle, e.g. after count changes it updates the page title.' },
    ],
    keyPoints: [
      'side effect = reaching outside React rendering',
      'document.title and setTimeout are side effects',
      '[count] → runs on mount and when count changes',
      '[] → runs once on mount; cleanup clears timer',
      'useState stores data/re-renders; useEffect runs code at lifecycle moments',
    ],
  },
  {
    id: 're-e10',
    prompt: 'Consider the same feature written in two ways:',
    code: trimCode(`
// Plain JavaScript
let likes = 0;
document.getElementById('likeButton').addEventListener('click', () => {
  likes = likes + 1;
  document.getElementById('likeCount').textContent = likes;
  document.getElementById('title').textContent = \`\${likes} likes\`;
});

// React
function LikeCounter() {
  const [likes, setLikes] = useState(0);
  return (
    <div>
      <h1>{likes} likes</h1>
      <p>{likes}</p>
      <button onClick={() => setLikes(likes + 1)}>Like</button>
    </div>
  );
}`),
    parts: [
      { label: 'a', text: 'How does each version update the user interface after a click?' },
      { label: 'b', text: 'Which parts stay the same (plain JavaScript) and which change between the two versions?' },
      { label: 'c', text: 'Why does the React approach scale better when the app grows?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Plain JS: the variable is changed and the developer manually finds and updates every element that depends on it (textContent of likeCount and title). React: setLikes updates the state, React re-renders the component, compares the new Virtual DOM with the old one and updates only the parts of the DOM that changed – both places that show likes update automatically.' },
      { label: 'b', text: 'Same: the arrow functions, template literal / expressions, the idea of a counter variable. Changed: state is tracked with useState instead of a plain variable; the event handler is a JSX prop (onClick) instead of addEventListener; no manual DOM manipulation (getElementById/textContent) – the UI is described in JSX.' },
      { label: 'c', text: 'In vanilla JS every new place that shows the value needs more manual DOM code, which leads to duplication and "DOM spaghetti". In React you describe the UI for a given state (UI = f(state)); one state update re-renders all dependents, components are reusable, and the data flow is predictable (one-way).' },
    ],
    keyPoints: [
      'plain JS: manual DOM updates for every element',
      'React: setState → re-render → virtual DOM diff → minimal DOM update',
      'same: arrow functions, template literals',
      'changed: useState vs variable, onClick prop vs addEventListener, no manual DOM code',
      'React scales: UI = f(state), reusable components, predictable data flow',
    ],
  },
]

export default {
  id: 'react',
  title: 'React',
  short: 'React',
  slides: ['8 – React I', '9 – React II', '10 – React III', '11 – JavaScript in React'],
  intro: 'Component thinking, JSX, props and state, events and forms, useEffect and fetching data, debugging, routing, deployment, and how React relates to plain JavaScript.',
  theory,
  mcq,
  essays,
}
