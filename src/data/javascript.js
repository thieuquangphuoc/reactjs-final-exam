import { p, h, ul, ol, table, code, plain, tip, trimCode } from './blocks.js'

const theory = [
  {
    id: 'js-role',
    title: 'The role of JavaScript',
    from: '6 – JavaScript I',
    blocks: [
      p("HTML = structure (skeleton), CSS = style (skin), **JavaScript = interaction (the brain)**. JavaScript is the language that adds interactivity to web pages."),
      h('Java vs. JavaScript'),
      p("Despite the name, they are different languages:"),
      table(
        ['Feature', 'Java', 'JavaScript'],
        [
          ['Primary use', 'server-side development, Android apps', 'front-end web development*'],
          ['Compilation', 'compiled into bytecode', 'interpreted at runtime'],
          ['Typing', 'strongly typed', 'loosely typed'],
          ['Platform', 'versatile, platform-independent', 'web browsers, primarily client-side'],
          ['Development role', 'backend, large-scale systems', 'front-end, UI enhancement'],
          ['Mobile apps', 'yes, mainly Android', 'yes, with frameworks like React Native'],
          ['Frameworks / libraries', 'Spring, Hibernate', 'React, Angular, Vue.js'],
          ['Common IDEs', 'Eclipse, IntelliJ IDEA', 'Visual Studio Code, Sublime Text'],
        ],
      ),
      p("*JavaScript can also be used for backend development through **Node.js**."),

      h('JavaScript runs in two environments'),
      table(
        ['In the browser (client-side)', 'On the server (server-side)'],
        [
          ['reacts to user actions (clicks, typing, scrolling)', 'handles data that must be stored or kept secure'],
          ['updates what you see **without reloading the page**', 'processes business logic and talks to databases'],
          ['e.g. showing/hiding content, form validation, animations, updating a like counter', 'e.g. saving user accounts, processing payments, sending emails'],
        ],
      ),
      p("**Chat app in the browser**: loads HTML, CSS and JS; receives new messages from the server and shows them by inserting new HTML; sends the user's messages to the server and adds them to the conversation. **Snake game**: listens to the arrow keys, updates the snake's direction and movement, updates points and lives. In both, **everything happens without reloading the page**."),

      h('What JavaScript can do in the browser'),
      ul([
        "**DOM (Document Object Model)** – read, change, create and remove HTML elements on the page. ← focus of this course",
        "Other browser APIs: graphics (Canvas, WebGL), audio/video, geolocation, storage, notifications, ...",
      ]),
      h('Adding JavaScript to an HTML page'),
      code(`
<!-- external file -->
<script src="path/to/your/file.js"></script>

<!-- or inline -->
<script>
  // write your code here
</script>`),
    ],
  },
  {
    id: 'js-variables',
    title: 'Variables and types',
    from: '6 – JavaScript I',
    blocks: [
      p("Variables have a type, but you **don't declare the type** – JavaScript infers it."),
      code(`
var weight = 4.3;          // old way, function scope
let age = 6;               // like var, but block scope: only inside { }
const hasShorthair = true; // constant: cannot be reassigned`),
      ul([
        "`let` and `const` are preferred over `var`: the smaller (block) scope prevents accidental bugs.",
        "Use `const` when the variable will not be reassigned, `let` when it will change.",
      ]),
      tip("`const` means the variable cannot be **reassigned** (`x = 5` gives an error). A `const` object or array can still have its contents changed."),
      h('Primitive types'),
      table(
        ['Type', 'Meaning', 'Example'],
        [
          ['Number', 'integers and floating-point numbers', 'let age = 6; let weight = 4.3;'],
          ['String', 'text, in quotes: \' \', " " or ` ` (template literal)', 'let name = "Toast";'],
          ['Boolean', 'true or false', 'let isSleeping = true;'],
          ['Undefined', 'declared but no value assigned yet (the default value)', 'let owner;  // undefined'],
          ['Null', 'the intentional absence of a value', 'let previousOwner = null;'],
        ],
      ),
      tip("**undefined** = \"no value has been given yet\" (automatic). **null** = \"empty on purpose\" (you set it)."),

      h('Non-primitive types: objects'),
      p("An object is a collection of **key-value pairs**."),
      code(`
let cat = {
  name: "Toast",
  age: 6,
  isSleeping: true
};
cat.name;        // "Toast"
cat.age;         // 6

// Creating an object from existing variables
let catName = "Toast";
let catAge = 6;
let cat2 = { catName: catName, catAge: catAge };
// Shorthand when key and variable name are the same:
let cat3 = { catName, catAge };   // { catName: "Toast", catAge: 6 }`),

      h('Non-primitive types: arrays'),
      code(`
let cats = ["Toast", "Naranja", "Kinsky"];
cats.length;          // 3
cats[0];              // "Toast"  (indexes start at 0)
cats[2];              // "Kinsky"

cats.push("Ramona");  // adds to the end → ["Toast", "Naranja", "Kinsky", "Ramona"]
cats.pop();           // removes the last → ["Toast", "Naranja", "Kinsky"]

for (let cat of cats) {
  console.log(cat);   // "Toast", "Naranja", "Kinsky"
}

cats.map(cat => cat.toUpperCase());  // ["TOAST", "NARANJA", "KINSKY"]
cats.filter(cat => cat.length > 5);  // ["Naranja", "Kinsky"]`),
      plain("`map` creates a new array by transforming every item. `filter` creates a new array with only the items that pass the test. \"Toast\" has length 5, which is not > 5, so it is filtered out."),
    ],
  },
  {
    id: 'js-functions',
    title: 'Functions and operators',
    from: '6 – JavaScript I',
    blocks: [
      p("A function is a **reusable block of code** that can take input, process it and return an output."),
      code(`
// Traditional syntax
function greetCat(name) {
  return "Terveh, " + name;
}

// Arrow function (ES6)
const greetCat2 = (name) => {
  return "Terveh, " + name;
};

// Arrow function shorthand
const greetCat3 = (name) => "Terveh, " + name;

greetCat("Naranja");  // "Terveh, Naranja"`),
      tip("The arrow **shorthand** (no curly braces) returns the expression automatically. **With curly braces you need an explicit `return`** – otherwise the function returns `undefined`."),
      h('Three common patterns'),
      code(`
// 1. No input needed – always does the same thing
const greet = () => "Terveh!";

// 2. Uses an outer variable – works, but is tied to that variable
const catName = "Naranja";
const greetOurCat = () => "Terveh, " + catName;

// 3. Takes a parameter – flexible and reusable
const greetAnyCat = (name) => "Terveh, " + name;
greetAnyCat("Toast");   // "Terveh, Toast"`),
      p("Arrow functions are very common with **arrays** and **event listeners**:"),
      code(`
cats.map(cat => cat.toUpperCase());

btn.addEventListener('click', () => {
  console.log('Liked!');   // console.log() prints to the browser console
});`),

      h('Operators'),
      table(
        ['Kind', 'Operators', 'Example'],
        [
          ['Arithmetic', '+  -  *  /  % (modulus/remainder)  ** (exponent)', '5 + 3 → 8,  2 ** 3 → 8,  7 % 2 → 1'],
          ['Assignment', '=  +=  -=  *=  /=', 'let total = 2; total += 3; // 5'],
          ['Comparison', '==  ===  !=  !==  <  >  <=  >=', '5 == "5" → true,  5 === "5" → false'],
          ['Logical', '&& (AND)  || (OR)  ! (NOT)', 'true && false → false,  true || false → true'],
        ],
      ),
      tip("`==` is a **loose** comparison (converts types first): `5 == \"5\"` is true. `===` is **strict** (value and type must match): `5 === \"5\"` is false. Prefer `===`."),
    ],
  },
  {
    id: 'js-control',
    title: 'Control flow and loops',
    from: '6 – JavaScript I',
    blocks: [
      h('if / else if / else'),
      code(`
let catAge = 5;
if (catAge < 1) {
  console.log("Kitten");
} else if (catAge < 10) {
  console.log("Adult");    // ← this runs
} else {
  console.log("Senior");
}`),
      h('Ternary operator'),
      p("Useful when you want to **assign a value based on a condition**, all in one expression: `condition ? valueIfTrue : valueIfFalse`."),
      code(`
let age = 6;
let ageGroup = (age >= 2) ? "Adult" : "Young";   // "Adult"

// The same with a full if/else:
let ageGroup2;
if (age >= 2) {
  ageGroup2 = "Adult";
} else {
  ageGroup2 = "Young";
}`),
      p("You will see it a lot in React: `{isLoggedIn ? \"Welcome back!\" : \"Please log in\"}`."),
      h('switch vs. object lookup'),
      code(`
function dayMessage(day) {
  switch (day) {
    case 'Monday': return 'Start of the week';
    case 'Friday': return 'End of the week';
    default:       return 'Middle of the week';
  }
}

// Alternative: object lookup (often cleaner)
const dayMessages = {
  'Monday': 'Start of the week',
  'Friday': 'End of the week',
};
function dayMessage2(day) {
  return dayMessages[day] || 'Middle of the week';  // value for that day OR the default
}`),
      p("Both give the same result. Object lookup is common in modern JavaScript and React; `switch` is still used, e.g. in reducers and event handlers with many cases. Inside a `switch` without `return`, use `break` to stop after a case."),

      h('Loops'),
      code(`
let i = 0;
while (i < 5) {
  console.log(i);   // 0, 1, 2, 3, 4
  i++;
}

for (let i = 0; i < 5; i++) {
  console.log(i);   // 0, 1, 2, 3, 4
}

let cats = ['Toast', 'Naranja', 'Kinsky'];
for (let cat of cats) {      // for...of → the VALUES of an array
  console.log(cat);          // 'Toast', 'Naranja', 'Kinsky'
}

let cat = { name: 'Kinsky', age: 10 };
for (let key in cat) {       // for...in → the KEYS of an object
  console.log(key, cat[key]);  // 'name' 'Kinsky', then 'age' 10
}`),
      tip("for...**of** → values (arrays). for...**in** → keys (objects)."),
    ],
  },
  {
    id: 'js-arrays',
    title: 'More array methods',
    from: '6 – JavaScript I',
    blocks: [
      code(`
let cats = ["Toast", "Naranja", "Kinsky"];

// Finding elements
cats.find(cat => cat.length > 5);       // "Naranja"  (first match only)
cats.findIndex(cat => cat.length > 5);  // 1          (index of first match)
cats.includes("Toast");                 // true

// Checking conditions
cats.every(cat => cat.length > 3);      // true  (do ALL match?)
cats.some(cat => cat === "Toast");      // true  (does ANY match?)
cats.some(cat => cat.startsWith("T"));  // true

// Transforming
cats.join(", ");    // "Toast, Naranja, Kinsky"
cats.reverse();     // ["Kinsky", "Naranja", "Toast"]  (changes the original!)
[...cats].sort();   // alphabetical sort of a COPY

// Aggregating
[3, 4, 5, 6].reduce((sum, n) => sum + n, 0);  // 18`),
      table(
        ['Method', 'Returns'],
        [
          ['map', 'a new array with every item transformed'],
          ['filter', 'a new array with all items that pass the test'],
          ['find', 'the first item that passes the test (or undefined)'],
          ['findIndex', 'the index of the first match (or -1)'],
          ['includes', 'true/false: is this value in the array?'],
          ['every / some', 'true/false: do all / any items pass?'],
          ['reduce', 'one single value built from all items (e.g. a sum)'],
          ['join', 'a string of all items with a separator'],
        ],
      ),
      h('The sort() trap'),
      code(`
let myNumbers = [21, 4, 30, 100000, 1];
myNumbers.sort();                 // [1, 100000, 21, 30, 4]  ← compared as TEXT!
myNumbers.sort((a, b) => a - b);  // [1, 4, 21, 30, 100000]  ← numeric order`),
      plain("Without a compare function, `sort()` compares items as strings, so \"100000\" comes before \"21\". Give it `(a, b) => a - b` to sort numbers. `sort()` and `reverse()` change the original array; `[...cats]` makes a copy first."),
      p("In `reduce((sum, n) => sum + n, 0)`, `0` is the starting value of `sum`; each step adds the next number: 0+3=3, 3+4=7, 7+5=12, 12+6=18."),
    ],
  },
  {
    id: 'js-dom',
    title: 'The DOM: selecting and changing elements',
    from: '6 – JavaScript I',
    blocks: [
      p("The **DOM (Document Object Model)** is the JavaScript API that the browser provides to manipulate the page's HTML. The page is a tree of element objects that JS can read and change."),
      h('Selecting elements'),
      p("To read or change an element you first have to find (select) it:"),
      table(
        ['Method', 'Selects', 'Returns'],
        [
          ["getElementById('container')", 'the element with that id', 'one element'],
          ["getElementsByClassName('myClass')", 'all elements with that class', 'HTMLCollection'],
          ["getElementsByTagName('p')", 'all elements with that tag', 'HTMLCollection'],
          ["querySelector('nav > ul > .first')", 'the FIRST element matching a CSS selector', 'one element'],
          ["querySelectorAll('div > p')", 'ALL elements matching a CSS selector', 'NodeList'],
        ],
      ),
      code(`
let container = document.getElementById('container');
let heading = document.querySelector('nav > ul > .first');
let divs = document.querySelectorAll('div > p');`),
      p("You can change an element in three ways: its **content**, its **attributes**, or its **appearance**. You can also **create** and **remove** elements."),
      h('Changing content'),
      code(`
// textContent: change or read the TEXT inside an element
document.getElementById('container').textContent = "New text content!";

// innerHTML: change or read the HTML inside an element
document.getElementById('container').innerHTML = "<p>Updated HTML content</p>";`),
      tip("To change the **visible text** of an element → `textContent`. `innerHTML` parses the string as HTML (tags become elements), so don't put user input into innerHTML."),
      h('Attributes'),
      code(`
document.querySelector('img').setAttribute('src', 'image.jpg');     // set or modify
let src = document.querySelector('img').getAttribute('src');        // read
document.querySelector('img').removeAttribute('alt');               // remove`),
      h('CSS classes and style'),
      code(`
const box = document.getElementById('container');
box.classList.add('newClass');      // add a class
box.classList.remove('oldClass');   // remove a class
box.classList.toggle('active');     // add if missing, remove if present
document.querySelector('p').style.color = 'blue';   // inline style`),
      h('Creating elements'),
      code(`
let newDiv = document.createElement('div');   // create a new element (not on the page yet)
newDiv.textContent = "I am a new div!";
document.body.appendChild(newDiv);            // add it as the LAST child of body`),
      h('Removing elements'),
      code(`
document.getElementById('container').remove();   // remove this element

let parent = document.getElementById('container');
let child = document.querySelector('p');
parent.removeChild(child);                         // remove a child from its parent`),
    ],
  },
  {
    id: 'js-events',
    title: 'Events and event listeners',
    from: '6 – JavaScript I',
    blocks: [
      p("Events make pages interactive: clicks, key presses, form submissions, ... An **event listener listens for a user action and runs a function** when it happens."),
      code(`
document.getElementById('myButton').addEventListener('click', function() {
  alert('Button was clicked!');
});`),
      table(
        ['Part', 'In the example'],
        [
          ['the element we interact with', "document.getElementById('myButton')"],
          ['the type of interaction (event)', "'click'"],
          ['what happens after the interaction (a function)', "function() { alert(...) }"],
        ],
      ),
      h('Common events'),
      table(
        ['Event', 'Happens when'],
        [
          ['change (onchange)', 'an HTML element has been changed'],
          ['click (onclick)', 'the user clicks an element'],
          ['mouseover (onmouseover)', 'the mouse moves over an element'],
          ['mouseout (onmouseout)', 'the mouse moves away from an element'],
          ['keydown (onkeydown)', 'the user presses a keyboard key'],
          ['load (onload)', 'the browser has finished loading the page'],
          ['submit (onsubmit)', 'a form is submitted'],
        ],
      ),
      plain("With `addEventListener` you write the event name **without** \"on\": `'click'`, `'keydown'`. The \"on...\" names are the HTML attribute / property versions."),
      h('Example: toggle button'),
      code(`
<button id="toggleButton">Show Text</button>
<p id="textToToggle" style="display: none;">Here is some hidden text!</p>

<script>
  const button = document.getElementById('toggleButton');
  const text = document.getElementById('textToToggle');

  button.addEventListener('click', () => {
    if (text.style.display === 'none') {
      text.style.display = 'block';
      button.textContent = 'Hide Text';
    } else {
      text.style.display = 'none';
      button.textContent = 'Show Text';
    }
  });
</script>`),
      h('Example: show the pressed key'),
      code(`
<h1 id="keyDisplay">Press any key!</h1>
<script>
  const keyDisplay = document.getElementById('keyDisplay');
  window.addEventListener('keydown', (event) => {
    keyDisplay.textContent = \`You pressed: \${event.key}\`;
  });
</script>`),
      plain("The listener function receives an **event object**. `event.key` is the key that was pressed. The backticks make a template literal: `${...}` inserts a value into the string."),
      h('Example: move a box with the arrow keys'),
      code(`
<style>
  #box { width: 50px; height: 50px; background-color: blue;
         position: relative; top: 0; left: 0; }
</style>
<div id="box"></div>
<script>
  const box = document.getElementById('box');
  let topPosition = 0;
  let leftPosition = 0;
  const moveAmount = 10;

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':    topPosition -= moveAmount; break;
      case 'ArrowDown':  topPosition += moveAmount; break;
      case 'ArrowLeft':  leftPosition -= moveAmount; break;
      case 'ArrowRight': leftPosition += moveAmount; break;
    }
    box.style.top = topPosition + 'px';
    box.style.left = leftPosition + 'px';
  });
</script>`),
      h('Putting it together (conceptual)'),
      table(
        ['Chat application', 'Snake game'],
        [
          ['new incoming message → createElement + textContent + appendChild', "keyboard input → addEventListener('keydown', ...)"],
          ['sending → event listener on the send button or keydown (Enter)', 'which arrow → event.key'],
          ['adding to the conversation → appendChild into the chat container', 'move the snake → change element style (position)'],
          ['styling mine vs. theirs → classList', 'update points and lives → textContent'],
        ],
      ),
      p("Kažigram with JavaScript: `const`/`let` store form inputs and post data; array methods manage the list of posts; a `submit` listener handles the form; `createElement` + `appendChild` add new post cards; `classList.toggle` changes the like heart; `textContent` updates the like count; `remove()` deletes a post."),
    ],
  },
  {
    id: 'js-libraries',
    title: 'Third-party JS libraries',
    from: '7 – JavaScript II',
    blocks: [
      h('Why use libraries? (Why reinvent the wheel?)'),
      ul([
        "faster development",
        "well-documented solutions",
        "battle-tested code",
        "bug fixes and maintenance",
        "browser quirks handled",
        "large user base",
      ]),
      h('Libraries exist at different layers'),
      table(
        ['Layer', 'Examples'],
        [
          ['CSS layer (styling and animation)', 'Bootstrap, Tailwind CSS, Animate.css'],
          ['JS + DOM layer (interaction and data)', 'GSAP, Flatpickr, Toastify, Chart.js, ...'],
          ['Component framework layer (application structure)', 'React, Angular, Vue.js'],
          ['Development tools', 'Vite, npm, ESLint, Babel'],
        ],
      ),
      h('Common tasks that libraries handle'),
      table(
        ['Task', 'How it is done'],
        [
          ['DOM manipulation', 'Vanilla JS (getElementById, querySelector, textContent, createElement, appendChild, remove) for small projects. Component frameworks (React, Angular, Vue) update the DOM through a Virtual DOM: you describe the UI, the framework decides what to change – the standard for modern apps. Historically jQuery simplified DOM work (still in older projects).'],
          ['Form validation', 'HTML attributes (required, pattern, min, max, type="email"); JS custom logic with addEventListener; libraries: Yup, Validator.js, Formik, React Hook Form (React); Survey.js (complete form builder).'],
          ['Animations and transitions', 'CSS transitions/keyframes, Animate.css; JS libraries GSAP, Anime.js for complex animations CSS cannot do (physics-based motion, scroll-triggered).'],
          ['Advanced interactions', 'date/time pickers (Flatpickr), toast notifications (Toastify), image editing (Cropper.js), rich text editors (Quill.js), drag and drop (Sortable.js), 3D graphics (Three.js).'],
          ['Data visualization', 'Chart.js (bar, line, pie, doughnut), Recharts (the same as React components), network diagrams (Cytoscape.js).'],
          ['UI component interactions', 'menus, accordions, tabs, modals, carts, form wizards: simple cases with vanilla JS (addEventListener, classList.toggle), complex cases with Angular, Vue, React.'],
        ],
      ),
      p("Other libraries worth knowing: Quill.js, Cropper.js, Survey.js, Sortable.js, Three.js, Cytoscape.js, Phaser (2D game engine)."),
      plain("All approaches to DOM manipulation change the DOM in the end – the difference is how directly you do it."),
      h('Using a library from a CDN: the pattern'),
      p("1) Add the library's **CSS** (if any) and **JS** file from a CDN in the `<head>`. 2) **Find the element**. 3) **Call the library function**."),
      code(`
<head>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
  <style> .like-btn.liked { color: red; border-color: red; } </style>
</head>
<body>
  <button class="like-btn" id="likeBtn">♡</button>
  <p id="likeCount">0 likes</p>
  <script>
    const btn = document.getElementById('likeBtn');
    const countEl = document.getElementById('likeCount');
    let likes = 0;
    let liked = false;

    btn.addEventListener('click', () => {
      liked = !liked;                          // toggle the boolean
      likes += liked ? 1 : -1;
      btn.textContent = liked ? '♥' : '♡';
      btn.classList.toggle('liked');           // class="like-btn" ↔ class="like-btn liked"
      countEl.textContent = likes + ' likes';
      gsap.fromTo(btn, { scale: 1 },           // GSAP: the heart grows and shrinks back
        { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1 });
    });
  </script>
</body>`, 'GSAP – animation'),
      code(`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<input type="text" id="dateRange" placeholder="Select date range">
<script>
  flatpickr("#dateRange", { mode: "range", dateFormat: "Y-m-d" });  // creates the date picker
</script>`, 'Flatpickr – date picker'),
      code(`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

<form id="postForm">
  <textarea id="caption" required></textarea>
  <button type="submit">Post</button>
</form>
<script>
  document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();                              // prevent page reload on submit
    const caption = document.getElementById('caption').value;
    Toastify({                                       // library function: creates the "toast"
      text: "Post published: " + caption,
      duration: 3000,
      style: { background: "#2ecc71" }
    }).showToast();                                  // ...and shows it on screen
    this.reset();
  });
</script>`, 'Toastify – notifications'),
      code(`
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" width="400" height="200"></canvas>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');  // canvas drawing context
  const myChart = new Chart(ctx, {          // creates the chart
    type: 'bar',                            // bar, line, pie, ...
    data: {
      labels: ['Toast', 'Naranja', 'Kinsky', 'Ramona'],   // X axis
      datasets: [{ label: 'Likes per cat', data: [47, 83, 31, 62] }]  // Y values
    }
  });
</script>`, 'Chart.js – charts'),
    ],
  },
  {
    id: 'js-async',
    title: 'Asynchronous JavaScript',
    from: '7 – JavaScript II',
    blocks: [
      h('Why asynchronous?'),
      p("`addEventListener`, `textContent`, `classList.toggle` run instantly. But fetching data from a server can take 1–5 seconds."),
      table(
        ['Without async (synchronous)', 'With async'],
        [
          ['JavaScript waits for the data', 'JavaScript starts the fetch and continues running other code'],
          ['the page freezes', 'it comes back to the data when it is ready'],
          ['the user cannot interact', 'the page stays responsive'],
        ],
      ),
      p("Main uses: sending a form (payment, posting a photo), sending messages, using 3rd party REST APIs – any communication with a server."),
      plain("Synchronous = standing in a queue doing nothing until it is your turn. Asynchronous = ordering food and doing other things while you wait."),
      p("**Note:** JavaScript is **single-threaded** – unlike Java threads it does not run code in parallel. Instead an **event loop** manages tasks cleverly so the page stays responsive."),

      h('Three ways of dealing with asynchrony'),
      p("Not just three alternatives – a **progression**; each one solved problems of the previous one:"),
      ol([
        "**Callbacks** – the first approach; works but gets messy.",
        "**Promises** – cleaner, but still complex to chain.",
        "**async/await** – the modern standard; reads like regular code.",
      ]),

      h('1. Callbacks'),
      p("A **callback** is a function passed as an argument to another function, and called when the task is done. You already know one: the function in `addEventListener` runs when the click happens, not immediately."),
      code(`
setTimeout(function () {
  alert("Time up!");      // runs after 3 seconds, not immediately
}, 3000);`),
      p("Problem when several async steps depend on each other – deeply nested callbacks (\"callback hell\"), hard to read and debug, and error handling must be repeated at every level:"),
      code(`
getData(function (data) {
  if (!data) return handleError('getData failed');
  processData(data, function (result) {
    if (!result) return handleError('processData failed');
    saveResult(result, function (response) {
      notifyUser(response, function () {
        // deeply nested...
      });
    });
  });
});`),

      h('2. Promises'),
      p("A **Promise** represents the eventual result of an async operation. States: **pending → fulfilled** or **rejected**."),
      code(`
getData()
  .then(data => processData(data))      // when the data arrives
  .then(result => saveResult(result))
  .then(response => notifyUser(response))
  .catch(error => handleError(error));  // ONE catch for the whole chain`),
      p("Better than nested callbacks: a flat chain, and one `.catch()` handles errors from anywhere. **But** if different steps need each other's data, you must store it in an outer variable because `.then()` steps cannot see each other's variables."),

      h('3. async/await – the modern standard'),
      p("Built **on top of Promises**, but reads like normal sequential code. Rules:"),
      ul([
        "define the function with `async`",
        "use `await` before the slow operation",
        "wrap it in `try/catch` for error handling (same as Java)",
        "the rest of the page continues normally while waiting",
      ]),
      code(`
async function getCats() {
  try {
    const response = await fetch('https://api.example.com/cats');
    const cats = await response.json();
    console.log(cats);   // use the data here
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}
getCats();   // call the function`),
      code(`
async function doEverything() {
  try {
    const data = await getData();
    const result = await processData(data);
    const response = await saveResult(result, data);  // data is still in scope
    await notifyUser(response);
  } catch (error) {
    handleError(error);   // one catch handles all errors
  }
}`, 'All variables in the same scope'),
      table(
        ['Approach', 'Summary'],
        [
          ['Callbacks', 'deeply nested, error handling repeated at every level'],
          ['Promises', 'flat chain, one .catch(), but sharing data needs outer variables'],
          ['async/await', 'flat, all variables in the same scope, one try/catch'],
        ],
      ),
      tip("`await` can only be used inside an `async` function."),
    ],
  },
  {
    id: 'js-rest',
    title: 'REST APIs and fetch()',
    from: '7 – JavaScript II',
    blocks: [
      h('The problem: we need real data'),
      p("So far our JavaScript used **hardcoded** data. Real apps need real, up-to-date data: movies, weather forecasts, maps, payments – anything that changes over time or belongs to a user."),
      h('The solution: REST APIs'),
      p("A **REST API** (Representational State Transfer Application Programming Interface) is an **address (URL) that another server provides**. It is a way for systems to **communicate over HTTP**."),
      ul([
        "It uses HTTP requests: GET, POST, PUT, DELETE.",
        "It exchanges data in **JSON** format: `{ \"name\": \"Toast\", \"age\": 6, \"likes\": 47 }`.",
        "Fetching data uses **async/await**, because waiting for a server takes time.",
      ]),
      p("How it works:"),
      ol([
        "Our JavaScript sends an HTTP request to the URL.",
        "The server processes the request.",
        "The server responds with data in JSON format.",
        "We use the data to update the DOM.",
      ]),
      p("Examples of public REST APIs: OpenStreetMap / Nominatim (maps, addresses), REST Countries, OpenSky Network (flights), Open Library (books), Wikipedia API, OMDB API (movies)."),

      h('Resource + HTTP method'),
      p("Data is treated as a **resource** identified by a **unique URL**. The **HTTP method** says what to do with it. Pattern: **URL identifies the resource, HTTP method defines the action.**"),
      table(
        ['Method', 'Action', 'Example (library API)'],
        [
          ['GET', 'retrieve data', '"give me the list of books"'],
          ['POST', 'create new data', '"add this new book"'],
          ['PUT', 'update data', '"change this book\'s information"'],
          ['DELETE', 'remove data', '"remove this book"'],
        ],
      ),
      h('JSON – JavaScript Object Notation'),
      code(`
// XML (older, heavier)
<cat>
  <name>Toast</name>
  <age>6</age>
</cat>

// JSON (modern, lightweight)
{
  "name": "Toast",
  "age": 6
}`),
      p("JSON looks like a JavaScript object (`let cat = { name: \"Toast\", age: 6 };`). It is preferred because it is **lighter** and **directly compatible with JavaScript objects**."),

      h('Statelessness: the server remembers nothing'),
      p("Each request must be **independent** and contain **all the information** the server needs. The server does not remember previous requests or store session information. In practice:"),
      ul([
        "every request must include authentication (if needed)",
        "the server treats each request independently",
        "this is why APIs often require an **API key in every request**",
      ]),

      h('fetch()'),
      p("`fetch()` is the modern **built-in** JavaScript function for HTTP requests."),
      code(`
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');  // GET by default
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);   // detect errors (404, 500...)
    }
    const data = await response.json();   // extract the JSON (needs await too)
    console.log(data);                    // use the data, e.g. update the DOM
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
getData();   // e.g. after clicking a button`),
      plain("`response.ok` is true for status codes 200–299. fetch only rejects (goes to catch) for network failures, so we check `ok` ourselves and `throw` for 404/500. `response.json()` reads the body and turns the JSON into a JavaScript object – it is also asynchronous, so it needs `await`."),
      h('GET is the default; other methods must be set'),
      code(`
await fetch('https://api.com/data', {
  method: 'POST',                                   // a create request
  headers: { 'Content-Type': 'application/json' }, // the body is JSON
  body: JSON.stringify({                            // JS object → JSON string
    name: 'Toast',
    email: 'toast@purr.pur'
  })
});`),
      h('Both syntaxes work for async functions'),
      code(`
async function getData() {
  const res = await fetch("https://my-api-url.com/");
  const data = await res.json();
}

const getData2 = async () => {
  const res = await fetch("https://my-api-url.com/");
  const data = await res.json();
};`),
      h('Example: jsonbin.io with Kažigram'),
      p("jsonbin.io gives a simple REST API for storing JSON. Each \"bin\" stores one JSON document. **GET** retrieves the whole bin (all posts), **PUT** replaces the whole bin (send the whole updated array). The headers include the **API key** – statelessness in practice: every request must authenticate itself."),
      h('Summary'),
      ul([
        "Libraries handle common tasks (data visualization, date pickers, UI interactions), saving time with tested code.",
        "Async JavaScript lets slow tasks run without blocking other code: callbacks → promises → async/await.",
        "REST APIs let systems communicate over HTTP: data is a resource (URL), the action is the HTTP method, data is exchanged as JSON.",
        "fetch is the built-in function for HTTP requests, used with async/await.",
      ]),
    ],
  },
]

const mcq = [
  {
    id: 'js-m1',
    q: 'What is the main difference between let and var?',
    options: [
      'let can only store numbers',
      'let has block scope: it is only accessible inside the { } where it is declared',
      'let variables can never be changed',
      'var is the modern, recommended keyword',
    ],
    answer: 1,
    explain: 'let is like var but with reduced (block) scope. let and const are preferred because the smaller scope prevents bugs.',
  },
  {
    id: 'js-m2',
    q: 'What happens when this code runs?',
    code: trimCode(`
const likes = 5;
likes = 6;`),
    options: [
      'likes becomes 6',
      'likes stays 5 and nothing happens',
      'An error, because a const variable cannot be reassigned',
      'likes becomes "56"',
    ],
    answer: 2,
    explain: 'const declares a constant: assigning a new value throws a TypeError.',
  },
  {
    id: 'js-m3',
    q: 'What is the value of owner after this line runs?',
    code: trimCode(`let owner;`),
    options: ['null', 'undefined', '0', 'an empty string ""'],
    answer: 1,
    explain: 'A declared variable without a value is undefined. null is only set on purpose.',
  },
  {
    id: 'js-m4',
    q: 'What are the results of 5 == "5" and 5 === "5"?',
    options: ['true and true', 'false and false', 'false and true', 'true and false'],
    answer: 3,
    explain: '== is a loose comparison (converts the string). === is strict: different types, so false.',
  },
  {
    id: 'js-m5',
    q: 'What does this code return?',
    code: trimCode(`[3, 4, 5, 6].reduce((sum, n) => sum + n, 0);`),
    options: ['18', '0', '[3, 4, 5, 6]', '6'],
    answer: 0,
    explain: 'reduce starts with sum = 0 and adds each number: 3 + 4 + 5 + 6 = 18.',
  },
  {
    id: 'js-m6',
    q: 'What is the result?',
    code: trimCode(`
const cats = ["Toast", "Naranja", "Kinsky"];
cats.filter(cat => cat.length > 5);`),
    options: ['["Toast", "Naranja", "Kinsky"]', '["Naranja", "Kinsky"]', '"Naranja"', '["Toast"]'],
    answer: 1,
    explain: '"Toast" has 5 letters (not > 5). filter returns a new array with all matching items.',
  },
  {
    id: 'js-m7',
    q: 'What is the difference between find() and filter()?',
    options: [
      'find() returns the first matching item; filter() returns an array of all matching items',
      'find() returns an array; filter() returns one item',
      'find() changes the original array; filter() does not',
      'There is no difference',
    ],
    answer: 0,
    explain: 'find → first match (or undefined). filter → new array with every match.',
  },
  {
    id: 'js-m8',
    q: 'What does this loop print?',
    code: trimCode(`
let cat = { name: 'Kinsky', age: 10 };
for (let key in cat) {
  console.log(key);
}`),
    options: ['"Kinsky" and 10', '0 and 1', '"name" and "age"', 'Nothing, for...in only works on arrays'],
    answer: 2,
    explain: 'for...in loops over the keys of an object. for...of loops over the values of an array.',
  },
  {
    id: 'js-m9',
    q: 'What does add(2, 3) return?',
    code: trimCode(`const add = (a, b) => { a + b };`),
    options: ['5', '"23"', 'An error', 'undefined'],
    answer: 3,
    explain: 'With curly braces an arrow function needs an explicit return. Without it, the result is undefined. (a, b) => a + b would return 5.',
  },
  {
    id: 'js-m10',
    q: 'What is the value of group?',
    code: trimCode(`
let age = 1;
let group = (age >= 2) ? "Adult" : "Young";`),
    options: ['"Adult"', '"Young"', 'true', 'undefined'],
    answer: 1,
    explain: 'condition ? valueIfTrue : valueIfFalse. 1 >= 2 is false, so "Young".',
  },
  {
    id: 'js-m11',
    q: "What does document.querySelector('.item') return?",
    options: [
      'All elements with the class item, as a NodeList',
      'The element with the id item',
      'The first element that matches the CSS selector .item',
      'An HTMLCollection of all <item> tags',
    ],
    answer: 2,
    explain: 'querySelector returns the first match of a CSS selector. querySelectorAll returns all matches (NodeList).',
  },
  {
    id: 'js-m12',
    q: 'You want to change the visible text of an element. Which property is most appropriate?',
    options: ['textContent', 'getElementById', 'createElement', 'addEventListener'],
    answer: 0,
    explain: 'textContent changes or reads the text inside an element. The others select, create or listen.',
  },
  {
    id: 'js-m13',
    q: "What does element.classList.toggle('active') do?",
    options: [
      'Always adds the class active',
      'Removes every class from the element',
      'Adds the class active if it is missing, removes it if it is present',
      'Checks whether the class exists and returns true or false',
    ],
    answer: 2,
    explain: 'toggle switches a class on and off. add / remove only add or only remove.',
  },
  {
    id: 'js-m14',
    q: 'Which event name do you use with addEventListener to react when the user presses a keyboard key?',
    options: ['keydown', 'onkey', 'press', 'keyboard'],
    answer: 0,
    explain: "window.addEventListener('keydown', (event) => ...). event.key tells which key was pressed.",
  },
  {
    id: 'js-m15',
    q: 'JavaScript is single-threaded. How does the page stay responsive while a fetch request waits for the server?',
    options: [
      'The browser starts a new thread that runs the JavaScript code in parallel',
      'The page is reloaded when the data arrives',
      'The code waits and the user cannot interact until the data arrives',
      'The fetch is started, other code keeps running, and an event loop returns to the result when it is ready',
    ],
    answer: 3,
    explain: 'JS does not run code in parallel; the event loop manages tasks so the page does not block.',
  },
  {
    id: 'js-m16',
    q: 'Which are the possible states of a Promise?',
    options: [
      'started, paused, stopped',
      'pending, then fulfilled or rejected',
      'open, closed',
      'sync, async',
    ],
    answer: 1,
    explain: 'A Promise is pending until it is fulfilled (success) or rejected (error).',
  },
  {
    id: 'js-m17',
    q: 'In a POST request with fetch, what does JSON.stringify() do?',
    options: [
      'It converts a JavaScript object into a JSON string for the request body',
      'It converts the JSON response into a JavaScript object',
      'It sends the request to the server',
      'It checks whether the response status is OK',
    ],
    answer: 0,
    explain: 'body: JSON.stringify(obj) turns the object into text. response.json() does the opposite with the response.',
  },
  {
    id: 'js-m18',
    q: 'In a REST API, how are the data and the action described?',
    options: [
      'The action is in the URL and the data is in the HTTP method',
      'Both are written in the JSON body',
      'The URL identifies the resource and the HTTP method defines the action',
      'The server decides the action based on the time of the request',
    ],
    answer: 2,
    explain: 'Pattern: URL = resource, method = action (GET, POST, PUT, DELETE). Data is exchanged as JSON.',
  },
  {
    id: 'js-m19',
    q: 'Why do many REST APIs require an API key in every request?',
    options: [
      'Because JSON cannot be sent without a key',
      'Because the server is stateless: it does not remember earlier requests, so each request must authenticate itself',
      'Because fetch() does not work without headers',
      'Because the key makes the response faster',
    ],
    answer: 1,
    explain: 'Statelessness: each request is independent and must carry all needed information, including authentication.',
  },
  {
    id: 'js-m20',
    q: 'You want to show likes per cat as a bar chart in plain JavaScript. Which library from the course fits?',
    options: ['Flatpickr', 'Toastify', 'Chart.js', 'GSAP'],
    answer: 2,
    explain: 'Chart.js = charts. Flatpickr = date picker, Toastify = toast notifications, GSAP = animations.',
  },
]

const essays = [
  {
    id: 'js-e1',
    prompt: 'Consider the following code:',
    code: trimCode(`
const button = document.getElementById('toggleButton');
const text = document.getElementById('textToToggle');

button.addEventListener('click', () => {
  if (text.style.display === 'none') {
    text.style.display = 'block';
    button.textContent = 'Hide Text';
  } else {
    text.style.display = 'none';
    button.textContent = 'Show Text';
  }
});`),
    parts: [
      { label: 'a', text: 'The paragraph starts with style="display: none;". What happens on the first and on the second click?' },
      { label: 'b', text: 'Which DOM techniques are used in the code (selecting, changing, events)?' },
      { label: 'c', text: 'Why are button and text declared with const?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'First click: display is "none", so the paragraph is shown (display: block) and the button text changes to "Hide Text". Second click: it is hidden again (display: none) and the button says "Show Text". Each click toggles.' },
      { label: 'b', text: 'Selecting: document.getElementById finds the button and the paragraph. Event: addEventListener("click", arrow function) runs the function on each click. Changing: style.display changes the appearance, textContent changes the visible text of the button.' },
      { label: 'c', text: 'The variables always refer to the same elements and are never reassigned. Changing the element\'s properties (style, textContent) is allowed with const; only reassigning the variable is not.' },
    ],
    keyPoints: [
      'first click shows text, button says Hide Text',
      'second click hides it again, button says Show Text',
      'getElementById selects elements',
      'addEventListener click runs a function',
      'style.display and textContent change the page',
      'const: never reassigned; properties can still change',
    ],
  },
  {
    id: 'js-e2',
    prompt: 'Consider the following code:',
    code: trimCode(`
const cats = [
  { name: "Toast", age: 6 },
  { name: "Naranja", age: 2 },
  { name: "Kinsky", age: 10 }
];
const names = cats.map(cat => cat.name);
const seniors = cats.filter(cat => cat.age >= 6);
const firstYoung = cats.find(cat => cat.age < 5);
const totalAge = cats.reduce((sum, cat) => sum + cat.age, 0);`),
    parts: [
      { label: 'a', text: 'What are the values of names, seniors, firstYoung and totalAge?' },
      { label: 'b', text: 'Explain the difference between filter and find.' },
      { label: 'c', text: 'What does cat represent in these arrow functions, and is the original cats array changed?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'names = ["Toast", "Naranja", "Kinsky"]. seniors = [{ name: "Toast", age: 6 }, { name: "Kinsky", age: 10 }]. firstYoung = { name: "Naranja", age: 2 }. totalAge = 6 + 2 + 10 = 18.' },
      { label: 'b', text: 'filter returns a new array with all items that pass the test. find returns only the first item that passes (not an array), or undefined if none does.' },
      { label: 'c', text: 'cat is the parameter of the callback: the current element of the array. The method calls the callback once for each element and passes the element in. map, filter, find and reduce return new values and do not change the original array.' },
    ],
    keyPoints: [
      'names = ["Toast","Naranja","Kinsky"]',
      'seniors = Toast and Kinsky objects',
      'firstYoung = Naranja object',
      'totalAge = 18',
      'filter = array of all matches; find = first match',
      'cat = current element passed by the method',
      'original array not changed',
    ],
  },
  {
    id: 'js-e3',
    prompt: 'Consider the following code (the CSS for #box contains position: relative;):',
    code: trimCode(`
const box = document.getElementById('box');
let left = 0;

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      left -= 10;
      break;
    case 'ArrowRight':
      left += 10;
      break;
  }
  box.style.left = left + 'px';
});`),
    parts: [
      { label: 'a', text: 'What happens when the user presses the right arrow key three times, and then the left arrow key once?' },
      { label: 'b', text: 'What are event and event.key?' },
      { label: 'c', text: 'Why is left declared with let while box uses const? Why is position: relative needed?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Each right arrow adds 10: left becomes 10, 20, 30 and the box moves 30px to the right. The left arrow subtracts 10, so left = 20 and the box is 20px from its original position. Other keys do not change left.' },
      { label: 'b', text: 'event is the event object that the browser passes to the listener function when a key is pressed. event.key is the name of the key that was pressed, e.g. "ArrowLeft" or "ArrowRight".' },
      { label: 'c', text: 'left changes every time a key is pressed, so it needs let (reassignment). box always refers to the same element, so const. The left property only moves positioned elements; with position: relative the box moves relative to its original position.' },
    ],
    keyPoints: [
      'right ×3 → 30px, left ×1 → 20px',
      'event = object passed to the listener',
      'event.key = which key was pressed',
      'let because the value changes; const because box is not reassigned',
      'position relative needed for left to move the element',
    ],
  },
  {
    id: 'js-e4',
    prompt: 'Consider the following code:',
    code: trimCode(`
async function getCats() {
  try {
    const response = await fetch('https://api.example.com/cats');
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    const cats = await response.json();
    console.log(cats);
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}
getCats();`),
    parts: [
      { label: 'a', text: 'Explain step by step what the code does.' },
      { label: 'b', text: 'Why is await used twice, and why must the function be async?' },
      { label: 'c', text: 'What are the roles of the response.ok check and the try/catch?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'getCats() is called. It sends a GET request to the API URL with fetch and waits for the response. If the status is not OK it throws an error. Otherwise it reads the body as JSON (turning it into a JavaScript value) and logs the cats. Any error is caught and logged with console.error.' },
      { label: 'b', text: 'Both fetch() and response.json() are asynchronous (they return promises): first we wait for the server response, then for the body to be read and parsed. await can only be used inside an async function. While waiting, the page is not blocked.' },
      { label: 'c', text: 'fetch only fails on network errors; an HTTP error like 404 or 500 still gives a response, so response.ok (false for non-2xx) detects it and throw turns it into an error. try/catch handles all errors in one place (network error, bad status, invalid JSON) so the app does not crash.' },
    ],
    keyPoints: [
      'fetch sends GET request to the API',
      'checks status, parses JSON, logs data',
      'await waits for fetch and for response.json()',
      'await only inside async; page not blocked',
      'response.ok detects HTTP errors (404/500)',
      'try/catch handles errors in one place',
    ],
  },
  {
    id: 'js-e5',
    prompt: 'Consider the following two versions of the same task:',
    code: trimCode(`
// Version A
getData(function (data) {
  processData(data, function (result) {
    saveResult(result, function (response) {
      notifyUser(response);
    });
  });
});

// Version B
getData()
  .then(data => processData(data))
  .then(result => saveResult(result))
  .then(response => notifyUser(response))
  .catch(error => handleError(error));`),
    parts: [
      { label: 'a', text: 'Which approach to asynchronous code does each version use?' },
      { label: 'b', text: 'What problems does version A have?' },
      { label: 'c', text: 'Rewrite the task with async/await and explain why it is considered the modern standard.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Version A uses callbacks (functions passed as arguments, called when each step is done). Version B uses Promises with .then() chaining and .catch().' },
      { label: 'b', text: 'Deeply nested callbacks ("callback hell"): the code moves to the right, is hard to read and debug, and error handling has to be repeated at every level.' },
      { label: 'c', text: 'async function run() { try { const data = await getData(); const result = await processData(data); const response = await saveResult(result); await notifyUser(response); } catch (error) { handleError(error); } } — async/await is built on promises but reads like normal sequential code, keeps all variables in the same scope (later steps can use earlier data), and one try/catch handles all errors.' },
    ],
    keyPoints: [
      'A = callbacks, B = promises',
      'callbacks: deep nesting, hard to read, repeated error handling',
      'promises: flat chain, one catch',
      'correct async/await rewrite with try/catch',
      'async/await reads like sequential code, same scope, one try/catch',
    ],
  },
  {
    id: 'js-e6',
    prompt: 'Consider the following code (inside an async function):',
    code: trimCode(`
const newPost = { title: 'Nap time', likes: 0 };

const response = await fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newPost)
});`),
    parts: [
      { label: 'a', text: 'What does this request do?' },
      { label: 'b', text: 'Explain the method, headers and body options.' },
      { label: 'c', text: 'Which HTTP methods would you use to update this post and to delete it? What does fetch use if no method is given?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'It sends the new post to the REST API to create a new resource (a post) on the server.' },
      { label: 'b', text: "method: 'POST' tells the server this is a create request. headers with Content-Type: application/json tells the server the body is in JSON format. body: JSON.stringify(newPost) converts the JavaScript object into a JSON string, because the body must be text." },
      { label: 'c', text: 'PUT to update and DELETE to delete. Without a method, fetch uses GET (retrieve data).' },
    ],
    keyPoints: [
      'creates a new post on the server',
      'POST = create',
      'Content-Type header = body is JSON',
      'JSON.stringify converts object → JSON string',
      'PUT update, DELETE delete',
      'default method GET',
    ],
  },
  {
    id: 'js-e7',
    prompt: 'Consider the following code:',
    code: trimCode(`
const form = document.getElementById('commentForm');
const input = document.getElementById('comment');
const list = document.getElementById('comments');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const li = document.createElement('li');
  li.textContent = input.value;
  li.classList.add('comment');
  list.appendChild(li);
  input.value = '';
});`),
    parts: [
      { label: 'a', text: 'What happens when the user submits the form?' },
      { label: 'b', text: 'What would happen if event.preventDefault() was removed?' },
      { label: 'c', text: 'Why is li.textContent used instead of li.innerHTML for the user\'s text, and what does classList.add do?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The listener runs: it stops the default submit, creates a new <li> element, puts the typed comment in it as text, gives it the class "comment", adds it as the last child of the comments list, and clears the input field. All without reloading the page.' },
      { label: 'b', text: 'The browser would do its default form submission: it sends the form and reloads the page, so the new comment would disappear immediately (and the input value is lost).' },
      { label: 'c', text: 'textContent inserts the input as plain text. innerHTML would interpret it as HTML, so a user could inject tags or scripts into the page. classList.add adds a CSS class so the new item can be styled (e.g. with a .comment rule).' },
    ],
    keyPoints: [
      'creates li with the comment text',
      'appendChild adds it to the list',
      'input cleared',
      'without preventDefault the page reloads / form is sent, comment lost',
      'textContent = plain text, innerHTML parses HTML (unsafe for user input)',
      'classList.add adds a class for styling',
    ],
  },
  {
    id: 'js-e8',
    prompt: 'Consider the following code:',
    code: trimCode(`
let cat = { name: 'Kinsky', age: 10 };
for (let key in cat) {
  console.log(key, cat[key]);
}

const cats = ['Toast', 'Naranja'];
for (let c of cats) {
  console.log(c);
}

let catAge = 10;
if (catAge < 1) {
  console.log("Kitten");
} else if (catAge < 10) {
  console.log("Adult");
} else {
  console.log("Senior");
}`),
    parts: [
      { label: 'a', text: 'What is printed to the console, in order?' },
      { label: 'b', text: 'What is the difference between for...in and for...of?' },
      { label: 'c', text: 'Rewrite lines 12–18 as one line using the ternary operator for two groups only: "Adult" when catAge < 10, otherwise "Senior".' },
    ],
    modelAnswer: [
      { label: 'a', text: '"name Kinsky", "age 10", then "Toast", "Naranja", then "Senior" (10 is not < 1 and not < 10, so the else branch runs).' },
      { label: 'b', text: 'for...in loops over the keys (property names) of an object, so cat[key] gives the value. for...of loops over the values of an array (iterable).' },
      { label: 'c', text: 'console.log(catAge < 10 ? "Adult" : "Senior"); (or const group = catAge < 10 ? "Adult" : "Senior";)' },
    ],
    keyPoints: [
      'name Kinsky / age 10',
      'Toast / Naranja',
      'Senior because 10 is not < 10',
      'for...in = object keys',
      'for...of = array values',
      'condition ? "Adult" : "Senior"',
    ],
  },
  {
    id: 'js-e9',
    prompt: 'Consider the following code:',
    code: trimCode(`
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
  <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</head>
<body>
  <form id="postForm">
    <textarea id="caption" required></textarea>
    <button type="submit">Post</button>
  </form>
  <script>
    document.getElementById('postForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const caption = document.getElementById('caption').value;
      Toastify({ text: "Post published: " + caption, duration: 3000 }).showToast();
      this.reset();
    });
  </script>
</body>`),
    parts: [
      { label: 'a', text: 'How does the Toastify library get into the page, and where does the Toastify function come from?' },
      { label: 'b', text: 'What happens when the user submits the form?' },
      { label: 'c', text: 'Give three benefits of using a third-party library instead of writing the notification yourself.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Lines 2–3 load the library from a CDN: the CSS file provides the styles of the notification and the JS file defines the Toastify function, which our script can then call.' },
      { label: 'b', text: 'The listener prevents the default submit (no page reload), reads the caption from the textarea, calls Toastify to create a "toast" notification "Post published: ..." that is shown on screen for 3000 ms (3 seconds), and then resets the form.' },
      { label: 'c', text: 'Faster development (no need to reinvent the wheel), well-documented, battle-tested code, bug fixes and maintenance by others, browser quirks handled, large user base. Any three.' },
    ],
    keyPoints: [
      'CSS + JS loaded from a CDN',
      'JS file provides the Toastify function',
      'preventDefault: no reload',
      'reads caption, shows toast for 3 seconds, resets form',
      'benefits: faster, documented, tested, maintained, browser quirks handled',
    ],
  },
  {
    id: 'js-e10',
    prompt: 'Consider the following code that stores Kažigram posts in jsonbin.io:',
    code: trimCode(`
const API_URL = 'https://api.jsonbin.io/v3/b/BIN_ID';

async function loadPosts() {
  const res = await fetch(API_URL, {
    headers: { 'X-Master-Key': API_KEY }
  });
  const data = await res.json();
  return data.record;
}

async function savePosts(posts) {
  await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
    body: JSON.stringify(posts)
  });
}`),
    parts: [
      { label: 'a', text: 'Which HTTP method does each function use, and what does each function do?' },
      { label: 'b', text: 'Why is the API key sent in both requests?' },
      { label: 'c', text: 'What is JSON, and why do REST APIs use it?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'loadPosts uses GET (the default, no method given): it retrieves the whole bin and returns the posts (data.record). savePosts uses PUT: it replaces the whole bin with the updated posts array, sent as JSON.' },
      { label: 'b', text: 'REST APIs are stateless: the server does not remember earlier requests or sessions, so every request must contain all the needed information, including authentication (the API key).' },
      { label: 'c', text: 'JSON (JavaScript Object Notation) is a text format for data with key-value pairs, the same shape as JavaScript objects. It is lighter than XML and directly compatible with JavaScript objects (JSON.stringify / response.json()).' },
    ],
    keyPoints: [
      'loadPosts = GET, retrieves data',
      'savePosts = PUT, replaces/updates data',
      'statelessness: each request independent',
      'API key = authentication in every request',
      'JSON = JavaScript Object Notation, key-value text format',
      'lighter than XML, compatible with JS objects',
    ],
  },
]

export default {
  id: 'javascript',
  title: 'JavaScript',
  short: 'JavaScript',
  slides: ['6 – JavaScript I', '7 – JavaScript II'],
  intro: 'Language basics, arrays and functions, the DOM and events, third-party libraries, asynchronous code and REST APIs with fetch.',
  theory,
  mcq,
  essays,
}
