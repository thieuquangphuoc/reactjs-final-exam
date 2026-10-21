import { p, h, ul, ol, table, code, plain, tip, trimCode } from './blocks.js'

const theory = [
  {
    id: 'a11y-what',
    title: 'Web accessibility',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      h('What is web accessibility?'),
      ul([
        "Accessibility means making websites **usable for all people, including people with disabilities**.",
        "Disabilities can be **visual, auditory, motor or cognitive**.",
        "Accessible design **benefits everyone**: better contrast helps in bright sunlight, captions help in noisy places, keyboard navigation helps people who prefer the keyboard over the mouse.",
      ]),
      h('Why accessibility matters'),
      ul([
        "**Legal requirements**: e.g. WCAG (Web Content Accessibility Guidelines) and the EU Accessibility Act.",
        "**Social responsibility**: equal access to information and services.",
        "**Practical benefits**: better usability, better SEO (Search Engine Optimization) and a better overall user experience.",
      ]),
      h('Key principles: POUR'),
      table(
        ['Principle', 'Meaning', 'Example'],
        [
          ['Perceivable', 'information must be visible or audible', 'alt text for images, captions for videos, high color contrast'],
          ['Operable', 'users can navigate with mouse, keyboard or assistive technology', 'everything works with the keyboard (Tab through links and forms)'],
          ['Understandable', 'content and navigation are clear', 'clear labels, predictable menus, simple language'],
          ['Robust', 'works well with different devices and assistive technologies', 'correct, semantic HTML that screen readers understand'],
        ],
      ),
      tip("High contrast between text and background → **Perceivable**. Keyboard navigation → **Operable**. Clear content → **Understandable**. Works on all devices / assistive tech → **Robust**."),
      h('Examples of accessibility features'),
      ul([
        "**Text alternatives** for images (the `alt` attribute).",
        "**High color contrast** between text and background.",
        "**Captions or transcripts** for videos.",
        "**Keyboard navigation** (tabbing through links and forms).",
      ]),
      code(`
<!-- Good: screen readers can describe the image -->
<img src="toast.jpg" alt="Orange cat sleeping on a white pillow">

<!-- Bad: no text alternative -->
<img src="toast.jpg">`),
    ],
  },
  {
    id: 'a11y-aria',
    title: 'ARIA attributes',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      ul([
        "**ARIA = Accessible Rich Internet Applications.**",
        "A set of **HTML attributes** that improve accessibility for people who use **assistive technologies** (like screen readers).",
        "They **do not change how the page looks**; they add extra meaning for assistive software.",
      ]),
      code(`
<button aria-expanded="false" aria-controls="menu1">
  Toggle Menu
</button>`),
      plain("`aria-controls=\"menu1\"` tells the screen reader which element this button controls (the element with id \"menu1\"). `aria-expanded=\"false\"` tells it that the menu is currently closed. When JavaScript opens the menu, it should change the value to \"true\"."),
      p("Other common ARIA attributes seen in the course: `aria-label` (a text label for an element that has no visible text), `aria-current=\"page\"` (marks the current page, e.g. in a breadcrumb)."),
    ],
  },
  {
    id: 'ui-components',
    title: 'UI components, UX and component libraries',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      h('Web user interface components'),
      ul([
        "**UI elements are the building blocks of apps and websites**: buttons, menus, forms, cards, modals, ...",
        "They are what users **interact with** when they use the product.",
      ]),
      h('UI & UX'),
      ul([
        "**UX = User eXperience** = how users experience a product.",
        "**Familiar design patterns build user trust; breaking patterns confuses users.**",
        "Designers reuse well-known UI components to keep the experience predictable.",
        "That is why the same components appear on many websites.",
      ]),
      h('Web UI component libraries'),
      p("A **UI component library** is a collection of reusable components, guided by clear standards. It gives **consistency, scalability and efficiency** in web development."),
      plain("Instead of designing every button from scratch, you take ready-made, tested components that look and behave the same everywhere."),
    ],
  },
  {
    id: 'bootstrap-intro',
    title: 'Bootstrap: what it is and how to add it',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      h('Bootstrap framework'),
      ul([
        "An **open-source CSS framework**.",
        "Provides **ready-made HTML, CSS and JavaScript components**.",
        "Designed for **responsive, mobile-first** websites.",
        "Free and very widely used (getbootstrap.com).",
      ]),
      h('Benefits of a framework like Bootstrap'),
      ul([
        "Speeds up development.",
        "Responsive design made easy.",
        "Built-in components (navigation bars, modals, etc.).",
        "Consistency across devices and browsers.",
        "Large community and documentation.",
      ]),
      tip("Main purpose of a CSS framework: **ready-made components for faster development**. It does not replace HTML, and it does not automatically make a site accessible."),
      h('Adding Bootstrap to a project'),
      ol([
        "**Using a CDN** (a link to a file hosted online).",
        "**Downloading** the files and including them locally.",
      ]),
      code(`
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-..."
  crossorigin="anonymous">`),
      h('How Bootstrap works: classes'),
      p("You use Bootstrap by **adding its CSS classes to your HTML elements**:"),
      ul([
        "`btn`, `text-*`, `bg-*` are pre-defined Bootstrap classes.",
        "Each class applies a set of CSS rules.",
        "You **combine classes** to get the look you want.",
        "No need to write custom CSS for common patterns.",
      ]),
      code(`
<button class="btn btn-primary">Submit your application</button>
<p class="text-success">Application sent successfully</p>
<div class="bg-warning">Please fill in all required fields</div>`),
      plain("`btn` = basic button style, `btn-primary` = the main (blue) color, `text-success` = green text, `bg-warning` = yellow background."),
    ],
  },
  {
    id: 'bootstrap-grid',
    title: 'Bootstrap grid system and containers',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      h('Grid system'),
      ul([
        "**Mobile-first, 12-column** layout.",
        "Classes for different **breakpoints** (screen widths):",
      ]),
      table(
        ['Class', 'Devices', 'Screen width'],
        [
          ['.col-xs- (in Bootstrap 5 just .col-)', 'extra small', 'below 576px'],
          ['.col-sm-', 'small', '≥ 576px'],
          ['.col-md-', 'medium', '≥ 768px'],
          ['.col-lg-', 'large', '≥ 992px'],
          ['.col-xl-', 'extra large', '≥ 1200px'],
        ],
      ),
      plain("The number says how many of the 12 columns the element takes: `col-6` = half, `col-4` = one third, `col-12` = full width. A breakpoint class works **from that width upwards** until a bigger breakpoint class overrides it. That is what mobile-first means: you describe the small screen first, then add changes for bigger screens."),
      tip("Medium devices (≥768px) → `.col-md-*`. Large (≥992px) → `.col-lg-*`. Small (≥576px) → `.col-sm-*`. Extra large (≥1200px) → `.col-xl-*`."),
      h('Containers'),
      p("Containers pad the content inside them. There are two container classes:"),
      ol([
        "`.container` – a **responsive fixed-width** container.",
        "`.container-fluid` – a **full-width** container, spanning the entire width of the viewport.",
      ]),
      h('Layout – desktop and mobile'),
      code(`
<div class="container-fluid">
  <div class="row">
    <div class="col-12 col-lg-4">MENU</div>
    <div class="col-12 col-lg-8">CONTENT</div>
  </div>
</div>`),
      ul([
        "**Mobile** (below 992px): both are `col-12` → full width, so MENU is stacked on top of CONTENT.",
        "**Desktop** (≥ 992px): MENU takes 4/12 (one third), CONTENT takes 8/12 (two thirds), side by side.",
      ]),
    ],
  },
  {
    id: 'bootstrap-components',
    title: 'Bootstrap components',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      p("Bootstrap has many pre-built UI elements: navigation bars, buttons, forms, modals, carousels, icons, etc."),
      h('Navbar'),
      code(`
<nav class="navbar navbar-expand-sm bg-primary navbar-dark">
  <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">Active</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
</nav>`),
      plain("`navbar` = navigation bar, `bg-primary` = primary background color, `navbar-dark` = light text for a dark background, `navbar-nav` / `nav-item` / `nav-link` = the list of links, `active` = current item, `disabled` = link that cannot be clicked."),
      h('Card'),
      p("A flexible content container. Options: headers, footers, contextual colors, display options."),
      code(`
<div class="card">
  <img class="card-img-top" alt="..." src="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`),
      table(
        ['Class', 'Role'],
        [
          ['card', 'the container'],
          ['card-img-top', 'image at the top'],
          ['card-body', 'content area'],
          ['card-title', 'title'],
          ['card-text', 'text content'],
        ],
      ),
      h('Form'),
      code(`
<form action="/action_page.php">
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" placeholder="Enter email" id="email">
  </div>
  <div class="form-group form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`),
      table(
        ['Class', 'Role'],
        [
          ['form-group', 'wraps each field (from Bootstrap 4; Bootstrap 5 uses spacing classes such as mb-3 instead)'],
          ['form-control', 'styles inputs and selects'],
          ['form-check', 'wrapper for checkboxes and radios'],
          ['form-check-input', 'the checkbox itself'],
          ['form-check-label', 'the label'],
        ],
      ),
      h('Breadcrumb'),
      p("Shows **the current page's location in a navigation hierarchy**. CSS automatically adds separators between the items."),
      code(`
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>`),
      plain("`breadcrumb` = the list, `breadcrumb-item` = each level, `active` = the current page. Notice the ARIA attributes `aria-label` and `aria-current`."),
      h('More components'),
      table(
        ['Component', 'What it is'],
        [
          ['accordion', 'collapsible sections'],
          ['alert', 'status messages'],
          ['badge', 'small labels'],
          ['button', 'buttons in various styles'],
          ['carousel', 'image slideshow'],
          ['dropdown', 'drop-down menu'],
          ['modal', 'popup dialog'],
        ],
      ),
      p("Full list: getbootstrap.com/docs/5.3/components/"),
    ],
  },
  {
    id: 'bootstrap-custom',
    title: 'Customizing Bootstrap and accessibility',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      h('Themes with Bootswatch'),
      ul([
        "Bootswatch (bootswatch.com) offers **free Bootstrap themes**.",
        "Different visual styles **without changing your HTML**.",
        "Simply **replace the Bootstrap CSS link** with a theme link. The same classes still work, but the look changes.",
      ]),
      code(`
<!-- original Bootstrap -->
<link href="https://cdn.../bootstrap.min.css" rel="stylesheet">

<!-- Bootswatch "Lumen" theme instead -->
<link href="https://bootswatch.com/5/lumen/bootstrap.min.css" rel="stylesheet">`),
      h('Your own CSS'),
      ul([
        "You can **override** Bootstrap's default styles with your own CSS.",
        "Add your custom stylesheet **after** Bootstrap.",
        "Remember the cascade: **later rules override earlier ones** (same specificity).",
      ]),
      code(`
<link href="bootstrap.min.css" rel="stylesheet">
<link href="my-custom.css" rel="stylesheet">`),
      code(`
/* my-custom.css */
.btn-primary {
  background-color: #6f42c1; /* custom purple */
  border-color: #6f42c1;
}`),
      h('Bootstrap & accessibility'),
      ul([
        "Many Bootstrap components include **built-in accessibility** features.",
        "They use **ARIA attributes** to describe elements to screen readers.",
        "They provide proper **keyboard navigation** in modals, dropdowns, carousels, etc.",
        "This helps meet accessibility standards with less extra work.",
      ]),
      tip("Bootstrap *helps* accessibility, but it does not make a site accessible automatically: you still need alt texts, good contrast, labels, ..."),
    ],
  },
  {
    id: 'css-frameworks',
    title: 'Alternative CSS frameworks',
    from: '5 – Accessibility, components and Bootstrap',
    blocks: [
      p("Bootstrap is widely used, but there are alternatives:"),
      table(
        ['Framework', 'Approach'],
        [
          ['Tailwind CSS', 'utility-first approach'],
          ['Bulma', 'Flexbox-based'],
          ['Pure.css', 'lightweight'],
          ['Materialize', 'Material Design'],
          ['Semantic UI', 'semantic class names'],
          ['Foundation', 'enterprise-focused'],
        ],
      ),
      p("All of them are CSS frameworks; the choice depends on the project. It is worth knowing they exist so you can evaluate design options critically."),
      h('Summary'),
      ul([
        "Web accessibility makes sites usable for everyone, including people with disabilities, and it benefits everyone (e.g. better contrast on a phone in sunlight).",
        "POUR principles: Perceivable, Operable, Understandable, Robust.",
        "UI elements are reusable building blocks that build trust through familiar patterns.",
        "A UI component library gives ready-made components for consistency and efficiency.",
        "Bootstrap is a CSS framework with pre-built HTML, CSS and JS components; added via CDN or local files; used through CSS classes, the 12-column grid and components; customizable with Bootswatch themes or your own CSS.",
        "Alternatives: Tailwind, Bulma, Pure.css, Materialize, Semantic UI, Foundation.",
      ]),
    ],
  },
]

const mcq = [
  {
    id: 'ab-m1',
    q: 'A website adds captions to all of its videos. Which accessibility principle does this mainly support?',
    options: ['Operable – content can be used with a keyboard', 'Perceivable – information can be seen or heard', 'Robust – content works on all devices', 'Understandable – navigation is clear'],
    answer: 1,
    explain: 'Captions make audio information visible, so it can be perceived by people who cannot hear it.',
  },
  {
    id: 'ab-m2',
    q: 'A user can reach every link and form field using only the Tab key. Which principle does this support?',
    options: ['Perceivable', 'Understandable', 'Operable', 'Robust'],
    answer: 2,
    explain: 'Operable = users can navigate with mouse, keyboard or assistive technology.',
  },
  {
    id: 'ab-m3',
    q: 'What does the Robust principle mean?',
    options: [
      'Content works well with different devices and assistive technologies',
      'The website never crashes under heavy traffic',
      'Text has a strong contrast with the background',
      'Forms validate all user input',
    ],
    answer: 0,
    explain: 'Robust – works well with different devices and assistive technologies.',
  },
  {
    id: 'ab-m4',
    q: 'Which HTML attribute is essential for making images accessible to screen reader users?',
    options: ['src', 'title', 'width', 'alt'],
    answer: 3,
    explain: 'alt gives a text alternative that screen readers read aloud.',
  },
  {
    id: 'ab-m5',
    q: 'Which statement about ARIA attributes is correct?',
    options: [
      'They change the colors of the page to increase contrast',
      'They add extra meaning for assistive technologies without changing how the page looks',
      'They are a JavaScript library that reads pages aloud',
      'They replace the need for semantic HTML tags',
    ],
    answer: 1,
    explain: 'ARIA (Accessible Rich Internet Applications) attributes add meaning for screen readers etc. They do not change the visual look.',
  },
  {
    id: 'ab-m6',
    q: 'Which example shows that accessible design benefits everyone, not only people with disabilities?',
    options: [
      'Small, low-contrast text fits more content on the screen',
      'Images without alt text load faster',
      'Captions help people watching a video in a noisy place',
      'Disabling keyboard navigation prevents accidental clicks',
    ],
    answer: 2,
    explain: 'The course examples: better contrast helps in sunlight, captions help in noisy environments, keyboard navigation helps keyboard users.',
  },
  {
    id: 'ab-m7',
    q: 'Which is a practical benefit of accessibility mentioned in the course?',
    options: ['It improves usability, SEO and overall user experience', 'It makes JavaScript run faster', 'It removes the need for CSS', 'It reduces hosting costs'],
    answer: 0,
    explain: 'Practical benefits: usability, SEO (Search Engine Optimization) and overall user experience.',
  },
  {
    id: 'ab-m8',
    q: 'Why do designers reuse well-known UI components (like the same kind of navbar on many sites)?',
    options: [
      'Because browsers can only display a fixed set of components',
      'Because familiar patterns build trust and keep the experience predictable',
      'Because new components are not allowed by WCAG',
      'Because reused components do not need any CSS',
    ],
    answer: 1,
    explain: 'Familiar design patterns build user trust; breaking patterns confuses users.',
  },
  {
    id: 'ab-m9',
    q: 'What is a web UI component library?',
    options: [
      'A list of all HTML tags supported by browsers',
      'A server that stores images for a website',
      'A database of user accounts',
      'A collection of reusable components guided by clear standards',
    ],
    answer: 3,
    explain: 'A UI component library = reusable components with clear standards, for consistency, scalability and efficiency.',
  },
  {
    id: 'ab-m10',
    q: 'What is the main purpose of using a CSS framework like Bootstrap?',
    options: [
      'It provides ready-made components for faster development',
      'It replaces the need for writing HTML',
      'It automatically makes any website fully accessible',
      'It compiles CSS into JavaScript',
    ],
    answer: 0,
    explain: 'Bootstrap gives ready-made HTML, CSS and JS components, which speeds up development.',
  },
  {
    id: 'ab-m11',
    q: "How many columns does Bootstrap's grid system have?",
    options: ['6', '10', '12', '16'],
    answer: 2,
    explain: 'Bootstrap uses a mobile-first, 12-column grid.',
  },
  {
    id: 'ab-m12',
    q: "Which class targets large devices (≥992px) in Bootstrap's grid?",
    options: ['.col-md-6', '.col-lg-6', '.col-sm-6', '.col-xl-6'],
    answer: 1,
    explain: 'sm ≥576px, md ≥768px, lg ≥992px, xl ≥1200px.',
  },
  {
    id: 'ab-m13',
    q: 'An element has class="col-12 col-lg-4". How does it behave?',
    options: [
      'It is always one third of the width',
      'It is full width on large screens and one third on small screens',
      'It is hidden on large screens',
      'It is full width below 992px and one third of the row from 992px up',
    ],
    answer: 3,
    explain: 'col-12 = 12/12 (full width) by default. From the lg breakpoint (≥992px) col-lg-4 takes 4/12 = one third.',
  },
  {
    id: 'ab-m14',
    q: 'What is the difference between .container and .container-fluid?',
    options: [
      '.container-fluid spans the full width of the viewport; .container is a responsive fixed-width container',
      '.container is full width; .container-fluid has a fixed width',
      '.container-fluid can only be used on mobile devices',
      'There is no difference; they are aliases',
    ],
    answer: 0,
    explain: '.container = responsive fixed width. .container-fluid = full width of the viewport.',
  },
  {
    id: 'ab-m15',
    q: 'Which markup produces a Bootstrap button in the primary color?',
    options: ['<button class="primary">', '<button class="btn-primary-color">', '<button class="btn btn-primary">', '<button style="bootstrap: primary">'],
    answer: 2,
    explain: 'You combine classes: btn (basic button style) + btn-primary (primary color).',
  },
  {
    id: 'ab-m16',
    q: 'In a Bootstrap card, which class is used for the main content area that holds the title and text?',
    options: ['card-img-top', 'card-text', 'card-content', 'card-body'],
    answer: 3,
    explain: 'card = container, card-img-top = image at top, card-body = content area, card-title = title, card-text = text.',
  },
  {
    id: 'ab-m17',
    q: 'Which Bootstrap class is used to style text inputs and selects in a form?',
    options: ['form-control', 'form-check', 'btn-input', 'input-group-text'],
    answer: 0,
    explain: 'form-control styles inputs and selects. form-check is for checkboxes and radios.',
  },
  {
    id: 'ab-m18',
    q: 'What is a Bootstrap breadcrumb used for?',
    options: [
      'Showing a popup dialog',
      "Showing the current page's location in a navigation hierarchy",
      'Showing an image slideshow',
      'Showing small labels next to text',
    ],
    answer: 1,
    explain: 'Breadcrumb = location in the navigation hierarchy (Home / Library / Data). Modal = popup, carousel = slideshow, badge = small label.',
  },
  {
    id: 'ab-m19',
    q: 'You link my-custom.css to change the color of .btn-primary. Where should the link be placed?',
    options: [
      'Before the Bootstrap link, so Bootstrap can read it',
      'Inside the <body>, after all buttons',
      'After the Bootstrap link, so your later rules override Bootstrap',
      'It does not matter; custom CSS always wins',
    ],
    answer: 2,
    explain: 'Cascade: with equal specificity the later rule wins, so your stylesheet must come after Bootstrap.',
  },
  {
    id: 'ab-m20',
    q: 'Which CSS framework is described as "utility-first"?',
    options: ['Bulma', 'Materialize', 'Foundation', 'Tailwind CSS'],
    answer: 3,
    explain: 'Tailwind = utility-first, Bulma = Flexbox-based, Materialize = Material Design, Foundation = enterprise-focused.',
  },
]

const essays = [
  {
    id: 'ab-e1',
    prompt: 'Consider the following code:',
    code: trimCode(`
<img src="sales-chart.png">

<div onclick="openMenu()">☰</div>

<p style="color: #cccccc; background-color: #ffffff;">
  Sale ends today!
</p>`),
    parts: [
      { label: 'a', text: 'Find an accessibility problem on line 1, line 3 and lines 5–7.' },
      { label: 'b', text: 'Which POUR principle does each problem break?' },
      { label: 'c', text: 'How would you fix each problem?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Line 1: the image has no alt text, so screen reader users get no information about the chart. Line 3: the menu "button" is a <div> with a click handler: it cannot be reached or used with the keyboard and has no text label for screen readers. Lines 5–7: light grey text on white has very low color contrast and is hard to read.' },
      { label: 'b', text: 'Missing alt text → Perceivable. Div that only works with the mouse → Operable (also Robust, since assistive technologies do not recognise it as a button). Low contrast → Perceivable.' },
      { label: 'c', text: 'Add a descriptive alt, e.g. alt="Sales grew from 10 to 30 units in March". Use a real <button> with a label, e.g. <button aria-label="Open menu" onclick="openMenu()">☰</button>, so it is keyboard accessible. Use a dark text color for high contrast against the background.' },
    ],
    keyPoints: [
      'img missing alt text',
      'div menu not usable with keyboard / no label',
      'low color contrast',
      'alt and contrast → Perceivable',
      'keyboard → Operable',
      'fixes: alt text, real button (aria-label), darker text color',
    ],
  },
  {
    id: 'ab-e2',
    prompt: 'Consider the following code:',
    code: trimCode(`
<button aria-expanded="false" aria-controls="menu1">
  Toggle Menu
</button>

<ul id="menu1" hidden>
  <li><a href="/feed">Feed</a></li>
  <li><a href="/profile">Profile</a></li>
</ul>`),
    parts: [
      { label: 'a', text: 'What does ARIA stand for, and do these attributes change how the button looks?' },
      { label: 'b', text: 'What do aria-expanded and aria-controls tell a screen reader?' },
      { label: 'c', text: 'When JavaScript shows the menu, what should it also do with aria-expanded? Why?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'ARIA = Accessible Rich Internet Applications: a set of HTML attributes that improve accessibility for people using assistive technologies like screen readers. They do not change how the page looks; they only add extra meaning for assistive software.' },
      { label: 'b', text: 'aria-controls="menu1" says that this button controls the element with id menu1. aria-expanded="false" says that the controlled menu is currently collapsed (closed).' },
      { label: 'c', text: 'It should set aria-expanded="true" when the menu opens (and back to "false" when it closes), so the screen reader announces the correct state. The attribute must stay in sync with what is visible.' },
    ],
    keyPoints: [
      'ARIA = Accessible Rich Internet Applications',
      'HTML attributes for assistive technologies / screen readers',
      'no visual change',
      'aria-controls points to the element with id menu1',
      'aria-expanded = whether it is open or closed',
      'JS must update aria-expanded to true when opened',
    ],
  },
  {
    id: 'ab-e3',
    prompt: 'Consider the following code:',
    code: trimCode(`
<div class="container-fluid">
  <div class="row">
    <div class="col-12 col-lg-4">MENU</div>
    <div class="col-12 col-lg-8">CONTENT</div>
  </div>
</div>`),
    parts: [
      { label: 'a', text: 'How is this layout shown on a mobile phone, and on a desktop screen (≥ 992px)?' },
      { label: 'b', text: 'Why do the column numbers 4 and 8 add up to 12?' },
      { label: 'c', text: 'What would change if .container was used instead of .container-fluid?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'On mobile (below 992px) both divs use col-12, so each takes the full width and MENU is stacked above CONTENT. On desktop (≥992px) col-lg-4 and col-lg-8 apply: MENU takes one third and CONTENT two thirds, side by side.' },
      { label: 'b', text: "Bootstrap's grid has 12 columns per row. 4 + 8 = 12, so the two columns together fill the whole row width." },
      { label: 'c', text: '.container-fluid spans the full width of the viewport. .container is a responsive fixed-width container: it has a maximum width at each breakpoint, so there would be empty space on the sides of large screens.' },
    ],
    keyPoints: [
      'mobile: full width, stacked',
      'desktop ≥992px: side by side, 1/3 and 2/3',
      'grid has 12 columns per row',
      'container-fluid = full viewport width',
      'container = responsive fixed width',
    ],
  },
  {
    id: 'ab-e4',
    prompt: 'Consider the following code (Bootstrap is linked in the <head>, no other CSS):',
    code: trimCode(`
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="toast.jpg" alt="Orange cat sleeping in the sun">
  <div class="card-body">
    <h5 class="card-title">Toast</h5>
    <p class="card-text">Sleeping in a sunbeam.</p>
    <a href="#" class="btn btn-primary">Like</a>
  </div>
</div>`),
    parts: [
      { label: 'a', text: 'We did not write any CSS for these classes. How do the elements get their style?' },
      { label: 'b', text: 'Explain the role of card, card-img-top, card-body, card-title and card-text.' },
      { label: 'c', text: 'Why does the <a> element look like a button?' },
    ],
    modelAnswer: [
      { label: 'a', text: "Bootstrap's CSS file (linked from a CDN or locally) already defines these classes. Each class applies a set of CSS rules, so adding the class to an element styles it. No custom CSS is needed for common patterns." },
      { label: 'b', text: 'card = the container of the component; card-img-top = image shown at the top of the card; card-body = the content area with padding; card-title = the title; card-text = the text content.' },
      { label: 'c', text: 'It has the classes btn and btn-primary. btn gives the basic button style and btn-primary the primary color; combining classes gives the final look, even though the element is a link.' },
    ],
    keyPoints: [
      'Bootstrap CSS defines pre-made classes',
      'adding a class applies its CSS rules',
      'card = container, card-img-top = top image, card-body = content area',
      'card-title = title, card-text = text',
      'btn + btn-primary make the link look like a primary button',
    ],
  },
  {
    id: 'ab-e5',
    prompt: 'Consider the following code:',
    code: trimCode(`
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="my-custom.css" rel="stylesheet">

/* my-custom.css */
.btn-primary {
  background-color: #6f42c1;
  border-color: #6f42c1;
}`),
    parts: [
      { label: 'a', text: 'What happens to buttons with the class btn-primary? Why?' },
      { label: 'b', text: 'Why must my-custom.css be linked after Bootstrap? What happens if the order is reversed?' },
      { label: 'c', text: 'Describe another way to change the whole look of a Bootstrap site without writing your own CSS.' },
    ],
    modelAnswer: [
      { label: 'a', text: "They become purple instead of Bootstrap's default blue. The custom rule overrides Bootstrap's rule because of the cascade." },
      { label: 'b', text: 'Both rules have the same specificity, so source order decides: the rule defined later wins. If my-custom.css came first, Bootstrap\'s rule would come later and override the custom color.' },
      { label: 'c', text: 'Use a Bootswatch theme: replace the Bootstrap CSS link with a theme link (e.g. https://bootswatch.com/5/lumen/bootstrap.min.css). The HTML and classes stay the same but the visual style changes.' },
    ],
    keyPoints: [
      'buttons become purple',
      'custom rule overrides Bootstrap (cascade)',
      'same specificity → later rule wins',
      'reversed order: Bootstrap overrides the custom style',
      'Bootswatch theme: replace the CSS link, same classes',
    ],
  },
  {
    id: 'ab-e6',
    prompt: 'Consider the following code:',
    code: trimCode(`
<form action="/action_page.php">
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" placeholder="Enter email" id="email">
  </div>
  <div class="form-group form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`),
    parts: [
      { label: 'a', text: 'What do the classes form-group, form-control and form-check do?' },
      { label: 'b', text: 'Which parts of this form help accessibility?' },
      { label: 'c', text: 'Give two benefits of using Bootstrap form components instead of styling the form yourself.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'form-group wraps each field (label + input) to group and space it. form-control styles the input field (full width, padding, border, focus style). form-check is the wrapper for a checkbox/radio, with form-check-input for the box and form-check-label for its label.' },
      { label: 'b', text: 'The <label for="email"> is connected to the input with id="email", so screen readers announce the label and clicking the label focuses the field. The checkbox is inside its <label>, which connects them too. type="email" tells the browser (and assistive technology) what kind of data is expected.' },
      { label: 'c', text: 'Faster development (ready-made styles), consistent look across devices and browsers, responsive design, and built-in accessibility features. Any two of these.' },
    ],
    keyPoints: [
      'form-group wraps a field',
      'form-control styles inputs/selects',
      'form-check for checkboxes/radios',
      'label connected to input (for/id or wrapping)',
      'benefits: speed, consistency, responsive, accessibility',
    ],
  },
  {
    id: 'ab-e7',
    prompt: 'Consider the following code:',
    code: trimCode(`
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-xl-3">Card 1</div>
    <div class="col-12 col-md-6 col-xl-3">Card 2</div>
    <div class="col-12 col-md-6 col-xl-3">Card 3</div>
    <div class="col-12 col-md-6 col-xl-3">Card 4</div>
  </div>
</div>`),
    parts: [
      { label: 'a', text: 'How many cards are shown per row on a phone (below 768px), a tablet (≥ 768px) and a large desktop (≥ 1200px)?' },
      { label: 'b', text: 'How many cards per row on a laptop that is 1000px wide (the lg range)? Why?' },
      { label: 'c', text: 'Explain what "mobile-first" means using this example.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Phone: col-12 → one card per row (full width). Tablet ≥768px: col-md-6 → two cards per row (6 + 6 = 12). Large desktop ≥1200px: col-xl-3 → four cards per row (3 × 4 = 12).' },
      { label: 'b', text: 'Two per row. There is no col-lg class, so the col-md-6 rule still applies from 768px upwards until col-xl-3 takes over at 1200px.' },
      { label: 'c', text: 'Mobile-first means the base classes describe the small screen (col-12) and the breakpoint classes (md, xl) add changes for larger screens. Each breakpoint class applies from its width upwards.' },
    ],
    keyPoints: [
      'phone: 1 per row',
      'tablet (md): 2 per row',
      'xl: 4 per row',
      'lg (1000px): still 2 per row because md applies upwards',
      'mobile-first: small screen first, breakpoints add changes upwards',
    ],
  },
  {
    id: 'ab-e8',
    prompt: 'Consider the following code:',
    code: trimCode(`
<nav class="navbar navbar-expand-sm bg-primary navbar-dark">
  <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">News</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#">Archive</a>
    </li>
  </ul>
</nav>`),
    parts: [
      { label: 'a', text: 'What does this code produce on the page?' },
      { label: 'b', text: 'What do bg-primary and navbar-dark do?' },
      { label: 'c', text: 'What is the meaning of the classes active and disabled here?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'A Bootstrap navigation bar (navbar component) with three links: Home, News and Archive. The navbar-nav / nav-item / nav-link classes style the list as navigation links.' },
      { label: 'b', text: 'bg-primary gives the navbar the primary (blue) background color. navbar-dark sets light-colored text that is readable on a dark background.' },
      { label: 'c', text: 'active marks the current item (Home), shown highlighted. disabled shows the Archive link greyed out and it cannot be clicked.' },
    ],
    keyPoints: [
      'Bootstrap navbar with three links',
      'bg-primary = primary background color',
      'navbar-dark = light text for a dark background',
      'active = current page/item',
      'disabled = link not clickable, greyed out',
    ],
  },
  {
    id: 'ab-e9',
    prompt: 'Consider the following code:',
    code: trimCode(`
<video src="tutorial.mp4" autoplay></video>

<a href="next.html">
  <img src="arrow-right.png">
</a>`),
    parts: [
      { label: 'a', text: 'What problems does this code cause for a deaf user and for a screen reader user?' },
      { label: 'b', text: 'How would you fix the problems?' },
      { label: 'c', text: 'Explain how your fixes also help people without disabilities.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Deaf users cannot follow the video because there are no captions or transcript. A screen reader user gets no information about the link: the image has no alt text, so the link has no readable name. The video also has no controls, so it cannot be paused or controlled (e.g. with the keyboard).' },
      { label: 'b', text: 'Add captions or a transcript for the video and add the controls attribute. Add alt text to the image that describes the link, e.g. alt="Next page".' },
      { label: 'c', text: 'Captions help in noisy environments or when sound must be off. Controls help everyone pause or replay. Clear link text helps everyone understand where the link goes, and helps SEO.' },
    ],
    keyPoints: [
      'no captions/transcript for deaf users',
      'image link without alt: screen reader cannot name the link',
      'no controls on the video',
      'fix: captions/transcript, controls, alt text',
      'benefits everyone: noisy places, usability, SEO',
    ],
  },
  {
    id: 'ab-e10',
    prompt: 'A page contains three "save" buttons, each made by a different developer:',
    code: trimCode(`
<button class="btn btn-primary">Save</button>

<a href="#" style="color: red; font-size: 9px;">save draft</a>

<div class="big-green-box" onclick="save()">SAVE!!!</div>`),
    parts: [
      { label: 'a', text: 'Why is this a problem for the user experience (UX)?' },
      { label: 'b', text: 'How would a UI component library such as Bootstrap help?' },
      { label: 'c', text: 'Line 5 also has an accessibility problem. What is it?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The same action looks different every time. Familiar, consistent design patterns build trust; breaking patterns confuses users and makes the interface unpredictable.' },
      { label: 'b', text: 'A component library gives reusable components with clear standards, so every save button is built the same way (e.g. btn btn-primary). This gives consistency, scalability and efficiency, and the components are tested and responsive.' },
      { label: 'c', text: 'It is a <div> with a click handler instead of a real <button>. It cannot be reached or activated with the keyboard and screen readers do not know it is a button (Operable/Robust problem). Line 3 also has very small text that is hard to read.' },
    ],
    keyPoints: [
      'inconsistent UI confuses users / breaks trust',
      'familiar patterns keep UX predictable',
      'component library = reusable, standardised components → consistency, efficiency',
      'div with onclick: not keyboard accessible, not announced as a button',
    ],
  },
]

export default {
  id: 'accessibility-bootstrap',
  title: 'Accessibility & Bootstrap',
  short: 'Accessibility & Bootstrap',
  slides: ['5 – Accessibility, components and Bootstrap'],
  intro: 'What accessibility is and the POUR principles, ARIA, UI components and UX, and Bootstrap: grid, components and customizing.',
  theory,
  mcq,
  essays,
}
