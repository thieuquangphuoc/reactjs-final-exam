import { p, h, ul, ol, table, code, plain, tip, trimCode } from './blocks.js'

const theory = [
  {
    id: 'web-basics',
    title: 'How the web works',
    from: '1 – Intro to the web',
    blocks: [
      h('Internet vs. Web'),
      p("They are **not** the same thing. The **Internet** is the network infrastructure: the global network of computers connected with the **TCP/IP** protocol. The **Web** is one application that runs on top of the Internet."),
      ul([
        "The Internet started as **ARPANET**. It connects computers to the network using **TCP/IP**.",
        "TCP/IP supports client-server applications through a socket interface.",
        "The first applications on the Internet were: telnet (virtual terminal), ftp (file transfer), email, ...",
        "In **1989 Tim Berners-Lee** proposed a new application: the **World Wide Web**.",
        "The Web is an information space of hypertext documents and other resources. Each resource is identified by a **URL**, documents are linked with **hyperlinks**, and everything is reached through the Internet.",
        "The first Web had a client application (a text browser) and a server application (a static web server).",
      ]),
      p("Tim Berners-Lee combined three essential technologies:"),
      table(
        ['Technology', 'Full name', 'Job'],
        [
          ['URL', 'Uniform Resource Locator', 'the address of a resource'],
          ['HTML', 'Hypertext Markup Language', 'the structure of the content'],
          ['HTTP', 'Hypertext Transfer Protocol', 'the communication protocol'],
        ],
      ),
      plain("Internet = the roads. Web = one kind of traffic on those roads (email and file transfer are other kinds)."),

      h('How the Web evolved'),
      table(
        ['Period', 'What happened', 'Where the logic is'],
        [
          ['The Web in the 90s', 'Static pages are served (HTTP GET) and forms are sent (HTTP POST). Every request refreshes everything: complete pages.', 'Only on the server'],
          ['Dynamic Web, late 1990s', 'Pages are generated on the server for each request, often with PHP or ASP. Cookies and databases allow user-specific pages. Still a full-page reload on each interaction, but the content is more personal.', 'Server'],
          ['The Web in the 2000s', 'AJAX (Asynchronous JavaScript and XML, XMLHttpRequest): JavaScript talks to the server asynchronously and fetches pieces of a page without reloading the whole page.', 'Mostly on the server'],
          ["Today's Web", 'SPA (Single Page Application): a web application architecture similar to desktop apps. The first request downloads the web app; after that other technologies (AJAX, WebSockets, RTSP, WebRTC, ...) send and receive data.', 'Mostly on the client. The server mainly stores data and handles authentication.'],
        ],
      ),

      h('Client–server architecture'),
      p("The **client** makes a request for a service to the **server**. The server responds to the request. The model divides the work between providers of a service (servers) and those who want the service (clients)."),
      p("**Servers**"),
      ul([
        "A machine that serves the content: a physical machine or a virtual machine in the cloud.",
        "A server machine has a \"known\" address on the Internet (DNS name resolution turns a name into an IP address).",
        "A program that provides services to clients is also called a server. Server programs run on a server machine.",
        "Each program connects to a **port** on the server machine. A web server uses **port 80** by default.",
        "Examples of web servers: Apache, Nginx, Microsoft-IIS, Node.js.",
      ]),
      p("**Clients**"),
      ul([
        "Devices that connect to the Internet: PCs, laptops, tablets, phones, ...",
        "Programs that access services on the Internet. The **browser** is the main client (Chrome, Firefox, Opera, Safari). Content in the browser is written in **HTML, CSS and JavaScript**.",
        "Mobile apps are the most used clients today. Native apps are built with platform languages: Android with Java/Kotlin, iOS with Swift.",
      ]),

      h('HTTP – Hypertext Transfer Protocol'),
      ul([
        "Gives hypermedia access to web pages and other Internet services.",
        "A **stateless**, transactional **request-response** protocol.",
        "An HTTP transaction is **always started by the client**.",
        "The client opens an HTTP connection to the server (or reuses one) and sends HTTP **requests** over it.",
        "The server answers by sending HTTP **responses** over the same connection.",
        "Request and response are independent (but related) transmissions, and they have the same format.",
      ]),
      plain("Stateless means the server does not remember earlier requests. Every request must carry everything the server needs."),

      h('HTTP methods (CRUD)'),
      p("The method (verb) of a request says what to do with a resource on the server. The four methods match the four CRUD operations:"),
      table(
        ['Method', 'CRUD', 'Meaning'],
        [
          ['POST', 'Create', 'Create a resource on the server'],
          ['GET', 'Read', 'Read a resource from the server'],
          ['PUT', 'Update', 'Update a resource on the server'],
          ['DELETE', 'Delete', 'Delete a resource from the server'],
        ],
      ),
      tip("Updating an existing profile = PUT. Creating a new post = POST. Loading a page = GET."),

      h('HTTP response codes'),
      table(
        ['Group', 'Code', 'Meaning'],
        [
          ['1xx Informative', '100 Continue', 'Continue a partial request'],
          ['2xx Request completed', '200 OK', 'Operation completed successfully, resource served'],
          ['', '201 Created', 'Resource created (or updated) successfully'],
          ['3xx Redirect', '301 Moved Permanently', 'The resource is somewhere else'],
          ['', '304 Not Modified', 'The client already has the data'],
          ['4xx Client error', '400 Bad Request', 'Incorrect request sent'],
          ['', '404 Not Found', 'Resource not found'],
          ['', '405 Method Not Allowed', 'Method not supported by the server'],
          ['', '409 Conflict', 'Conflict with the state of the resource'],
          ['', '410 Gone', 'Resource no longer exists'],
          ['5xx Server error', '500 Internal Server Error', 'The server has an error'],
        ],
      ),
      tip("4xx = the client did something wrong. 5xx = the server did something wrong."),

      h('MIME types'),
      p("A MIME type (Multipurpose Internet Mail Extensions) tells the type of a resource or file, in email, on the Web, ... The format is `type/subtype`."),
      ul([
        "Text: `text/plain` (plain text), `text/html` (HTML), `text/css` (CSS file), `text/javascript` (JavaScript).",
        "Images: `image/gif`, `image/jpeg`, `image/png`, and SVG vector images.",
        "Form data in the request body: `application/x-www-form-urlencoded` (URL-encoded parameters) and `multipart/form-data` (parameters in multiple formats, e.g. file uploads).",
        "Response in several blocks: `multipart/byte-ranges`.",
      ]),
    ],
  },
  {
    id: 'html-basics',
    title: 'HTML foundations',
    from: '2 – HTML',
    blocks: [
      h('What is HTML?'),
      p("HTML = **HyperText Markup Language**. A markup language is a system for annotating a document so that the annotations are clearly separate from the actual content (the text)."),
      ul([
        "Origin of the word \"markup\": editors \"marked up\" academic manuscripts with revision instructions, often written in blue.",
        "In HTML, markup is used for the **semantic structuring of content** (it says what each piece of content *is*).",
        "In 1989 Tim Berners-Lee created the WWW project and defined HTML based on the **SGML** standard (Standard Generalized Markup Language).",
        "The **W3C** develops the technical specifications and guidelines so that quality stays high.",
        "Documentation: MDN, W3Schools, W3C, HTML cheat sheets.",
      ]),
      p("The role of the three client technologies:"),
      table(
        ['Technology', 'Role', 'Picture'],
        [
          ['HTML', 'structure and content', 'the skeleton'],
          ['CSS', 'style and layout', 'the skin'],
          ['JavaScript', 'interaction / behaviour', 'the brain'],
        ],
      ),

      h('HTML syntax'),
      code(`
<div id="main">
  <!-- this is a comment -->
  This is text without a tag.
  <button class="mini">press me</button>
  <img src="me.png" />
</div>`),
      ul([
        "**Tag name**: `div`, `button`, `img`.",
        "**Attributes**: extra information inside the opening tag, e.g. `id=\"main\"`, `class=\"mini\"`, `src=\"me.png\"`.",
        "**Comment**: `<!-- ... -->` is ignored by the browser.",
        "**Text**: content between tags.",
        "**Self-closing tag**: a tag without content, e.g. `<img ... />`.",
      ]),

      h('Structure of an HTML document'),
      code(`
<!doctype html>
<html>
  <head>
    <title>Welcome</title>
  </head>
  <body>
    <h1>Welcome to our Site!</h1>
    <p>This is my first website</p>
  </body>
</html>`),
      table(
        ['Part', 'Meaning'],
        [
          ['<!doctype html>', 'content type: this is an HTML document'],
          ['<html>', 'the whole document'],
          ['<head>', 'metadata about the document (not shown on the page)'],
          ['<title>', 'document title (shown in the browser tab)'],
          ['<body>', 'the content that is visible on the page'],
          ['<h1>', 'heading level 1'],
          ['<p>', 'paragraph'],
        ],
      ),
      p("HTML has tags for many things: basic tags, text formatting, headings, comments, links, images, layouts, forms, tables, lists, frames, audio, video and others."),
      code(`
<p>I am a paragraph</p>
<input type="text" placeholder="input stuff here">
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
<button>Submit</button>
<a href="https://www.uef.fi/fi/">UEF Website</a>`, 'What do these tags do?'),
      plain("Paragraph of text · one-line text input with a grey hint · numbered list with two items · clickable button · link to the UEF website."),
    ],
  },
  {
    id: 'html-content',
    title: 'Text, lists, tables, block vs inline',
    from: '2 – HTML',
    blocks: [
      h('Text tags'),
      p("Text tags give content a semantic structure. Text is mostly made of **headings** `<h1>` ... `<h6>` and **paragraphs** `<p>`."),
      code(`
<h1>Level 1 Headline</h1>
<p>This is a paragraph example of how paragraphs must be formatted in an HTML document.</p>`),

      h('Semantic vs. physical emphasis'),
      table(
        ['Semantic emphasizers (say what the text means)', 'Physical emphasizers (only change the look)'],
        [
          ['<em> emphasized text', '<small> smaller text'],
          ['<strong> important text', '<b> bold text'],
          ['<code> source code', '<i> italic text'],
          ['<dfn> definition', '<u> underlined text'],
          ['<cite> title of a work', '<s> strikethrough text'],
          ['', 'text<sub>subscript</sub> and text<sup>superscript</sup>'],
        ],
      ),
      plain("`<strong>` and `<b>` both look bold, but only `<strong>` tells browsers and screen readers \"this is important\". Same idea for `<em>` vs `<i>`."),

      h('Other text elements'),
      ul([
        "`<pre>` – preformatted paragraph with a fixed-width font; spaces and line breaks are kept.",
        "`<blockquote cite=\"http://uef.fi\">` – a textual quote.",
        "`<br/>` – a single line break.",
      ]),
      code(`
<pre>
for (i=1 ; i<10 ; i++) {
    print $i
}
</pre>
<blockquote cite="http://uef.fi">A university in Finland</blockquote>`),

      h('HTML attributes'),
      p("Besides the tag name, tags can have **attributes**. For example an image needs to know its source:"),
      code(`<img src="cat.png"/>`),

      h('Lists'),
      code(`
<!-- Numbered (ordered) list -->
<ol>
  <li>Element 1</li>
  <li>Element 2</li>
</ol>

<!-- Unnumbered (unordered) list -->
<ul>
  <li>Element 1</li>
  <li>Element 2</li>
</ul>`),

      h('Tables'),
      p("A table uses `<table>`, `<tr>` for each **row**, `<th>` for a **header cell** and `<td>` for a normal **data cell**."),
      code(`
<table>
  <tr>
    <th></th>
    <th>Population</th>
    <th>Men</th>
    <th>Women</th>
  </tr>
  <tr>
    <th>Germany</th>
    <td>82,020,578</td>
    <td>40,346,853</td>
    <td>41,673,725</td>
  </tr>
</table>`),

      h('Block and inline elements'),
      p("Every element is displayed as **block** or **inline** by default."),
      table(
        ['', 'Block', 'Inline (line)'],
        [
          ['Width', 'takes the full width of the page', 'only takes the width it needs'],
          ['New line', 'forces a new line before and after', 'does not force a new line'],
          ['Examples', '<article> <aside> <canvas> <div> <footer> <h1>–<h6> <header> <p> <pre> <section> <ul>', '<em> <a> <br> <img> <span> <button> <input> <select> <textarea>'],
          ['Neutral container', '<div>', '<span>'],
        ],
      ),
      p("`<div>` is a block element used to contain other elements. `<span>` is an inline element used to contain other elements or text. Both have **no meaning**: they are **semantically neutral**."),
      tip("\"Group elements together as a container without any semantic meaning\" → `<div>`. Tags like `<section>`, `<article>`, `<nav>`, `<header>` do carry meaning."),

      h('id and class attributes'),
      table(
        ['id', 'class'],
        [
          ['Uniquely identifies **one** element on the page.', 'Defines a **group (class)** of elements.'],
          ['An element has only one id, and the value must be unique on the page.', 'Many elements can share the same class, and one element can have several classes (separated by spaces).'],
          ['<div id="theBox">', '<div class="RedBackgroundBox">'],
        ],
      ),
      plain("id and class connect HTML to CSS (`#theBox`, `.text`) and to JavaScript (`getElementById`, `getElementsByClassName`)."),
    ],
  },
  {
    id: 'html-media',
    title: 'Images, video, audio and embedding',
    from: '2 – HTML',
    blocks: [
      p("Image formats used on websites: **GIF, JPG, PNG**, and vector images in **SVG**."),
      code(`<img src="photo.jpg" width="470" height="600" alt="Self-portrait"/>`),
      ul([
        "`src` – where the image file is.",
        "`width` / `height` – size.",
        "`alt` – a text alternative (read by screen readers and shown if the image cannot load). See the Accessibility tab.",
      ]),
      h('Responsive images with <picture>'),
      p("`<picture>` lets the browser choose between several images depending on media conditions (for example screen width). The `<img>` inside is the default/fallback."),
      code(`
<picture>
  <source media="(min-width: 1100px)" srcset="shaum6.jpg">
  <source media="(min-width: 800px)" srcset="shaum4.jpg">
  <source media="(min-width: 400px)" srcset="shaum2.jpg">
  <img src="shaum1.jpg" alt="shaum">
</picture>`),
      h('Video and audio'),
      code(`
<video src="video.mp4" poster="video.jpg" autoplay loop controls></video>
<audio src="audio.mp3" controls autoplay loop></audio>`),
      ul([
        "`controls` – show play/pause/volume controls.",
        "`autoplay` – start playing automatically.",
        "`loop` – start again when finished.",
        "`poster` – image shown before the video plays.",
      ]),
      h('Embedding other pages'),
      p("`<iframe>` embeds another web page inside your page, e.g. a YouTube video:"),
      code(`<iframe width="560" height="315" allowfullscreen src="https://www.youtube.com/embed/Z4pCqK-V_Wo"></iframe>`),
    ],
  },
  {
    id: 'html-links',
    title: 'Links, menus and URLs',
    from: '2 – HTML',
    blocks: [
      h('The <a> tag'),
      p("`<a></a>` defines links to local or external pages or resources."),
      ul([
        "`href` is the main attribute: the URL of the link destination.",
        "`target` decides where to open the link, e.g. `_blank` opens it in a new window/tab.",
      ]),
      code(`
<!-- Opens DuckDuckGo in a new tab -->
<a href="https://duckduckgo.com/" target="_blank">Go to DuckDuckGo</a>

<!-- Asks the email program to write to this address -->
<a href="mailto:name@myDomain.com">Contact</a>

<!-- Opens a PDF stored on our server -->
<a href="file2.pdf">File 2</a>`),
      h('Menus'),
      p("A menu is a **list of links**. Recommended: `<nav>` + `<ul>`/`<li>` + `<a>`."),
      code(`
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="about.html">About us</a></li>
  </ul>
</nav>`),
      h('URLs: absolute vs. relative'),
      p("A URL (Uniform Resource Locator) locates a file on the Internet."),
      table(
        ['Type', 'Meaning', 'Example'],
        [
          ['Absolute URL', 'the full address of a page on the Internet', '<a href="https://news.ycombinator.com/">'],
          ['Relative (local) URL', 'a path relative to the folder of the current page on the same server', '<a href="pag2.html">, <a href="pag/pag5.html">, <a href="../index.html">'],
        ],
      ),
      plain("`../` means \"go up one folder\". `css/style.css` means \"the file style.css inside the folder css next to this page\"."),
    ],
  },
  {
    id: 'html-forms',
    title: 'Forms and user input',
    from: '2 – HTML',
    blocks: [
      p("Pages with fields the user can fill in are made with `<form>`. Inside it you use `<input>`, `<textarea>`, `<button>`, `<select>`, `<option>`, `<optgroup>`, `<fieldset>`, `<label>` and `<output>`."),
      ul([
        "A form makes an **HTTP request** that sends the data to the web server.",
        "`action` – the URL where the request is sent.",
        "`method` – whether the request is **GET** or **POST**.",
        "**GET**: data goes in the **URL query** as `name=value` pairs separated by `&`. `name` comes from each field's `name` attribute; `value` is what the user typed or the field's `value` attribute.",
        "**POST**: data goes in the **body** of the request, encoded as given by the form's `enctype`: `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.",
      ]),
      code(`
<form action="https://elearn.uef.fi/login" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" placeholder="your username"/>

  <label for="passwd">Password:</label>
  <input type="password" id="passwd" name="password" placeholder="your password"/>

  <input type="submit" value="Login">
</form>`),
      plain("`<label for=\"username\">` is linked to the input with `id=\"username\"`. Clicking the label focuses the field, and screen readers read the label for that field."),

      h('Input types and validation'),
      ul([
        "`<input>` is used for text, passwords, numbers, dates, file uploads, ...",
        "The `type` attribute sets the kind of field: `color`, `date`, `email`, `file`, `number`, `password`, `radio`, `range`, `text` (default).",
        "Validation attributes: `required` (must be filled), `pattern` (text must match a regex, e.g. `pattern=\".+@.+\"`), `min` (minimum value, e.g. `min=\"0\"`), `max` (maximum value, e.g. `max=\"10\"`).",
      ]),
      code(`
<!-- radio: exclusive choices (same name = only one can be chosen) -->
<label for="red">Red:</label>
<input type="radio" id="red" name="color" value="red">
<label for="blue">Blue:</label>
<input type="radio" id="blue" name="color" value="blue" checked>

<!-- checkbox: non-exclusive choices (any number can be chosen) -->
<label for="english">English:</label>
<input type="checkbox" id="english" name="english" value="en">
<label for="french">French:</label>
<input type="checkbox" id="french" name="french" value="fr" checked>`),
      tip("Radio buttons with the **same `name`** form one group where only one can be selected. Checkboxes are independent. `checked` = selected by default."),

      h('Other form elements'),
      ul([
        "`<textarea>` – text with several lines.",
        "`<select>` – a drop-down list; each choice is an `<option>`. `selected` = chosen by default.",
        "`<button>` – buttons. `type=\"submit\"` sends the form, `type=\"reset\"` clears the fields, `type=\"button\"` does nothing by itself (used with JavaScript).",
      ]),
      code(`
<label for="seleccion">Selection:</label>
<select id="seleccion" name="sel">
  <option>Well informed</option>
  <option selected>Informed</option>
  <option>Not informed</option>
</select>

<label for="area">Multiple lines of text:</label>
<textarea id="area" name="msg" rows="5" cols="40">Default initial value</textarea>

<button type="button">Button</button>
<button type="reset">Clear fields</button>
<button type="submit">Submit form</button>`),
    ],
  },
  {
    id: 'html-head',
    title: 'The <head>: metadata and a full example',
    from: '2 – HTML',
    blocks: [
      table(
        ['Purpose', 'Tag'],
        [
          ['Character encoding', '<meta charset="UTF-8">'],
          ['Description', '<meta name="description" content="Free Web tutorials">'],
          ['Keywords', '<meta name="keywords" content="HTML, CSS, JavaScript">'],
          ['Author', '<meta name="author" content="John Doe">'],
          ['Responsive (mobile) layout', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'],
          ['Title when the link is shared (Open Graph)', '<meta property="og:title" content="Itä-Suomen yliopisto">'],
          ['Description when shared (Open Graph)', '<meta property="og:description" content="Welcome to UEF.">'],
          ['Preview image when shared (Open Graph)', '<meta property="og:image" content="...">'],
          ['Preview on X (Twitter)', '<meta name="twitter:title" ...> and <meta name="twitter:description" ...>'],
        ],
      ),
      plain("Open Graph (`og:`) tags decide how your page looks when someone shares the link on social media: title, description and preview image."),
      p("Custom fonts (e.g. Google Fonts) are added with `<link>` tags in the `<head>`. See the CSS section."),
      h('Example: the Kažigram cat page'),
      code(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Kažigram — the cat-themed page">
  <title>Kažigram</title>
</head>
<body>
  <header>
    <h1>Welcome to Kažigram</h1>
    <nav>
      <ul>
        <li><a href="#feed">Feed</a></li>
        <li><a href="#new">New post</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  </header>

  <section id="feed">
    <article>
      <img src="cat1.jpg" alt="Cat outside, some snow and grass">
      <h2>The winter is coming</h2>
      <p>Still some grass to eat.</p>
      <button>♡ Like</button>
    </article>
  </section>

  <section id="new">
    <h2>Share your cat moment</h2>
    <form action="#" method="post">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>
      <label for="photo">Photo:</label>
      <input type="file" id="photo" name="photo" accept="image/*" required>
      <button type="submit">Post</button>
    </form>
  </section>

  <footer>
    <p>&copy; 2026 Kažigram</p>
  </footer>
</body>
</html>`),
      plain("`href=\"#feed\"` jumps to the element with `id=\"feed\"` on the same page. `<header>`, `<nav>`, `<section>`, `<article>` and `<footer>` are semantic tags that describe the parts of the page."),
    ],
  },
  {
    id: 'css-basics',
    title: 'CSS basics and selectors',
    from: '3 – CSS',
    blocks: [
      p("**HTML should only represent the content.** A separate language, **CSS** (Cascading Style Sheets), is used to write rules about **style** and **layout**."),
      h('CSS syntax'),
      code(`
body {
  color: red;
}`),
      ul([
        "`body` – the **selector** (which elements the rule targets).",
        "`color` – the **property**.",
        "`red` – the **value**.",
      ]),
      code(`
background-color: lightblue;
cursor: pointer;
display: none;
text-align: center;
background-image: url("exampleImageName.jpg");`, 'Property–value examples'),

      h('Three ways to add CSS'),
      table(
        ['Way', 'How', 'Applies to'],
        [
          ['Inline', 'a `style` attribute on the element: `<p style="color: yellow; font-style: italic;">`', 'only that one tag; not shared with others'],
          ['Internal', 'a `<style>` block in the `<head>`', 'all elements on that page'],
          ['External', 'a separate .css file: `<link rel="stylesheet" href="style.css">`', 'any HTML file that links it – content and presentation fully separated'],
        ],
      ),
      code(`
<head>
  <style>
    b { font-size: 12pt; color: green; }
    /* Headers */
    h1, h2 { margin-left: 15pt; color: red; }
  </style>
</head>`, 'Internal CSS'),

      h('Default CSS values'),
      p("Every HTML tag has **default CSS values** (for example `<h1>` is big and bold). They can differ between browsers. Your own styles **override** the defaults."),

      h('Selecting by tag, class or id'),
      code(`
p { color: red; }          /* type selector: every <p> */
.myClass { color: red; }   /* class selector: every element with class="myClass" */
#myId { color: red; }      /* ID selector: the element with id="myId" */
p.myClass { color: red; }  /* combination: <p> elements that have class="myClass" */`),
      code(`<p class="myClass" id="myId">Hello</p>`),
      tip("Class selector starts with a dot `.`, ID selector starts with a hash `#`. IDs must be unique; classes can be reused."),

      h('Selecting by relationships and states'),
      table(
        ['Selector', 'Name', 'Selects'],
        [
          ['h1, h2', 'multiple (group)', 'both all <h1> and all <h2>'],
          ['nav li', 'descendant', 'every <li> inside <nav>, at any depth'],
          ['ul > li', 'child', 'only <li> elements that are direct children of <ul>'],
          ['h1 + p', 'adjacent sibling', 'a <p> that comes immediately after an <h1>'],
          ['a:hover', 'pseudo-class', 'an <a> while it is in a state (mouse over it)'],
          ['*', 'universal', 'all elements'],
        ],
      ),
      p("Pseudo-classes match an element in a specific **state**: `:hover`, `:focus`, `:visited`, `:first-child`, ..."),
    ],
  },
  {
    id: 'css-cascade',
    title: 'The cascade, specificity and inheritance',
    from: '3 – CSS',
    blocks: [
      h('What is cascading?'),
      p("A cascade is something that flows in a series of stages (originally a series of waterfalls). In **Cascading** Style Sheets it answers one question: **which style rule applies when several rules target the same element?**"),
      p("Style declarations \"flow down\" from different sources and are **resolved into a single result**."),

      h('Three levels of the cascade'),
      ol([
        "**Origin and importance**: `!important` > inline > internal > external > browser default. A declaration marked `!important` gets the highest priority.",
        "**Specificity**: the hierarchy of CSS selectors (see below).",
        "**Source order**: the order in which rules are written. If everything else is equal, the rule defined **later** wins.",
      ]),
      code(`
p { color: blue !important; }   /* wins over everything below */
p { color: green; }             /* would win over earlier p rules (later in the file) */`),
      plain("Internal `<style>` blocks and external .css files are both *your* stylesheets. When their rules have the same specificity, the one that comes later in the page wins. Internal styles usually come after the `<link>` to the external file, which is why they normally win."),

      h('Specificity hierarchy'),
      p("Every selector has a place in the specificity hierarchy (from strongest to weakest):"),
      ol([
        "**Inline styles** – `<h1 style=\"color: pink;\">`",
        "**IDs** – `#navbar`",
        "**Classes, pseudo-classes, attribute selectors** – `.test`, `:hover`, `[href]`",
        "**Elements and pseudo-elements** – `h1`, `::before`",
      ]),
      p("Short version: **inline > id > class > element**. Specificity is really a numeric value: each ID, class, element, ... in a selector is counted."),
      tip("Highest specificity among `#main`, `.item`, `p`, `*` → `#main`. The universal selector `*` has the lowest (zero) specificity."),

      h('Inheritance'),
      p("Some rules are **inherited** from parent elements to their children, unless a more specific rule on the child overrides them."),
      code(`
body { color: blue; }  /* all text becomes blue */
h1 { color: red; }     /* but h1 elements override this */`),
    ],
  },
  {
    id: 'css-styling',
    title: 'Styling text, backgrounds and borders',
    from: '3 – CSS',
    blocks: [
      h('Text properties'),
      ul([
        "`text-align: center | left | right | justify`",
        "`text-decoration` is a **shorthand** that combines `text-decoration-line` (overline | line-through | underline | none), `text-decoration-color` and `text-decoration-style` (solid | dashed | dotted | wavy | ...).",
        "`text-decoration: none;` is often used to remove the underline from links.",
      ]),
      code(`
/* Shorthand */
.discount { text-decoration: line-through red wavy; }

/* Same result with individual properties */
.discount {
  text-decoration-line: line-through;
  text-decoration-color: red;
  text-decoration-style: wavy;
}`),

      h('Font size and font family'),
      p("**1em = the current font size.** The default text size in browsers is **16px**, so by default 1em = 16px."),
      code(`
p { font-size: 40px; }
p { font-size: 2.5em; }  /* 40px / 16 = 2.5em */
p { font-size: 25vw; }   /* vw = % of the viewport width */`),
      code(`
.one   { font-family: "Times New Roman", Times, serif; }
.two   { font-family: Arial, Helvetica, sans-serif; }
.three { font-family: "Lucida Console", "Courier New", monospace; }`),
      plain("`font-family` is a list of fallbacks: the browser uses the first font it has. The last one is a generic family (serif, sans-serif, monospace) that always exists."),

      h('Google Fonts'),
      ol([
        "Go to fonts.google.com and choose a font.",
        "Click \"Get font\" → \"Get embed code\".",
        "Add the `<link>` tags to the `<head>` of index.html.",
        "Use the font in CSS.",
      ]),
      code(`
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sofia:wght@400;600;700&display=swap">`),
      code(`body { font-family: 'Sofia', sans-serif; }`),

      h('Backgrounds'),
      code(`
.catbox {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 5px dashed #555;
  background-image: url("cat.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.catcontent {
  background-clip: content-box;
}`),
      p("By default a background image **repeats** to fill the area (`background-repeat: repeat`) and extends to the **border** of the element (`background-clip: border-box`). You can change both."),
      table(
        ['Property', 'Values'],
        [
          ['background-repeat', 'repeat (default, tiles the image) · no-repeat (shows it once) · repeat-x / repeat-y (tiles only horizontally / vertically)'],
          ['background-clip', 'border-box (default, image goes under the border) · padding-box (stops at the padding) · content-box (only behind the content)'],
          ['background-size', 'cover (fills the whole area, may crop) · contain (fits inside the area, may leave empty space) · 100% 100% (stretch to fit)'],
          ['background-position', 'center · top · bottom · left · right'],
        ],
      ),
      tip("cover = no empty space, but parts of the image may be cut off. contain = the whole image is visible, but there may be empty space."),

      h('Borders'),
      code(`
p { border: 2px solid blue; }            /* width style color */
p { border-bottom: 6px solid red; }      /* only one side */
p { border: 12px solid red; border-radius: 5px; }  /* rounded corners */`),
      ul([
        "`border-width`: 5px, medium, thick, ...",
        "`border-style`: dotted, dashed, solid, double, ...",
        "`border-color`: red, blue, #f0f0f0, ...",
      ]),
    ],
  },
  {
    id: 'css-layout',
    title: 'Layout: box model, display, position, flexbox, media queries',
    from: '3 – CSS',
    blocks: [
      h('The box model'),
      p("Every element is a box: **content** → **padding** → **border** → **margin**."),
      ul([
        "**Padding** = space around the content, **inside** the border.",
        "**Margin** = space around the element, **outside** the border.",
      ]),
      code(`
/* Same margin on all sides */
div { margin: 100px; }

/* Each side separately */
div {
  margin-top: 100px;
  margin-right: 40px;
  margin-bottom: 20px;
  margin-left: 30px;
}

/* Shorthand, clockwise: top right bottom left */
div { margin: 100px 40px 20px 30px; }`),
      tip("Four-value shorthand goes **clockwise from the top**: top, right, bottom, left (\"TRouBLe\")."),

      h('display'),
      table(
        ['Value', 'Effect'],
        [
          ['none', 'the element is not displayed'],
          ['inline', 'displayed as an inline element'],
          ['block', 'displayed as a block element'],
          ['inline-block', 'sits in the line like an inline element, but you can set width and height'],
          ['flex', 'a block-level flex container'],
          ['grid', 'a block-level grid container'],
        ],
      ),

      h('position'),
      table(
        ['Value', 'Effect'],
        [
          ['static (default)', 'normal flow of the page'],
          ['relative', 'moved relative to its own original position (with top/left/...)'],
          ['absolute', 'positioned relative to an ancestor element'],
          ['fixed', 'stays in the same place on the screen when scrolling'],
        ],
      ),

      h('Flexbox'),
      p("A **flex container** is an element with `display: flex`. Its **direct children** become **flex items**. The container's rules control how the children are arranged."),
      code(`
<div class="myflex">   <!-- flex container -->
  <div>1</div>          <!-- flex item -->
  <div>2</div>          <!-- flex item -->
  <div>3</div>          <!-- flex item -->
</div>`),
      code(`
.myflex {
  display: flex;            /* THIS makes it a flex container */
  flex-direction: row;      /* arrange children horizontally */
  justify-content: center;  /* center them on the main axis */
  align-items: center;      /* center them on the cross axis */
}`),
      ul([
        "`flex-direction: row | row-reverse | column | column-reverse`",
        "`flex-wrap: nowrap | wrap | wrap-reverse`",
        "`justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | ...` – along the **main axis**",
        "`align-items: stretch | flex-start | flex-end | center | baseline` – along the **cross axis**",
      ]),
      plain("With `flex-direction: row` the main axis is horizontal, so `justify-content` moves items left/right and `align-items` moves them up/down. With `column` it is the other way round."),
      p("**Flex items** can grow to fill the space:"),
      code(`
.item  { flex: 1; }  /* all items: equal share */
.item2 { flex: 2; }  /* this item: twice as much */`),

      h('Responsive design: media queries'),
      p("The `@media` rule applies different style rules for different media types and conditions, such as:"),
      ul([
        "width and height of the viewport",
        "orientation of the viewport (landscape or portrait)",
        "resolution",
      ]),
      code(`
body {
  background-color: pink;
}

/* only if the media type is screen AND the viewport is 480px wide or wider */
@media screen and (min-width: 480px) {
  body {
    background-color: lightgreen;
  }
}`),
      p("Media queries only work correctly if the HTML has the viewport meta tag:"),
      code(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`),
      tip("`min-width: 480px` means \"480px **or wider**\". Below 480px the pink background is used."),

      h('Summary'),
      ul([
        "HTML for content, CSS for style and layout.",
        "Rules are added inline, internal or external, and target elements with tag, class, id or combination selectors.",
        "Cascading = several rules flow down and are resolved into one result: origin/importance, specificity, source order.",
        "Text is styled with text-align, font-size, font-family, color, ...",
        "Backgrounds (color or image) and borders frame an element.",
        "The box model, display, position and flexbox control where elements appear.",
        "Media queries make layouts responsive by applying different rules at different screen sizes.",
      ]),
    ],
  },
]

const mcq = [
  {
    id: 'hc-m1',
    q: 'Which three technologies did Tim Berners-Lee combine to create the World Wide Web?',
    options: ['TCP/IP, FTP and email', 'URL, HTML and HTTP', 'HTML, CSS and JavaScript', 'DNS, SMTP and Telnet'],
    answer: 1,
    explain: 'URL = address of a resource, HTML = structure of content, HTTP = communication protocol. TCP/IP is the Internet itself, not the Web.',
  },
  {
    id: 'hc-m2',
    q: 'HTTP is a stateless request-response protocol. Which statement is correct?',
    options: [
      'The server can start a transaction by sending a response first',
      'The server keeps the session of each client open between requests',
      'The client always starts the transaction, and each request is handled independently',
      'Requests and responses must be sent over different connections',
    ],
    answer: 2,
    explain: 'An HTTP transaction is always initiated by the client. Stateless = the server does not remember previous requests.',
  },
  {
    id: 'hc-m3',
    q: 'A browser requests a page and the server answers with status code 404. What does it mean?',
    options: ['The resource was not found', 'The server has an internal error', 'The resource was created successfully', 'The client already has the latest data'],
    answer: 0,
    explain: '404 Not Found is a client error (4xx). 500 = server error, 201 = created, 304 = not modified.',
  },
  {
    id: 'hc-m4',
    q: 'Which HTTP method creates a new resource on the server?',
    options: ['GET', 'PUT', 'DELETE', 'POST'],
    answer: 3,
    explain: 'CRUD: POST = Create, GET = Read, PUT = Update, DELETE = Delete.',
  },
  {
    id: 'hc-m5',
    q: "In today's Single Page Applications (SPA), where does most of the application logic run?",
    options: [
      'On the server, which sends a complete new page for every click',
      'On the client, in the browser',
      'In the DNS server that resolves the address',
      'In the database, which builds the HTML',
    ],
    answer: 1,
    explain: 'In an SPA most of the logic is on the client. The server is mainly for storing data and authentication.',
  },
  {
    id: 'hc-m6',
    q: 'Which tag marks text as semantically important, not just visually bold?',
    options: ['<b>', '<u>', '<strong>', '<small>'],
    answer: 2,
    explain: '<strong> is a semantic emphasizer ("important text"). <b>, <u> and <small> are physical emphasizers that only change the look.',
  },
  {
    id: 'hc-m7',
    q: 'Which of these elements is displayed inline by default?',
    options: ['<span>', '<div>', '<p>', '<section>'],
    answer: 0,
    explain: '<span> is inline (takes only the width it needs). <div>, <p> and <section> are block elements.',
  },
  {
    id: 'hc-m8',
    q: 'What is the difference between the id and the class attribute?',
    options: [
      'A class must be unique on the page, an id can be reused',
      'id is used only by CSS and class only by JavaScript',
      'Both must be unique on the page',
      'An id must be unique on the page, a class can be shared by many elements',
    ],
    answer: 3,
    explain: 'id uniquely identifies one element. A class defines a group of elements and can be reused.',
  },
  {
    id: 'hc-m9',
    q: 'A form has method="get". Where is the form data sent?',
    options: [
      'In the body of the HTTP request',
      'In the URL query string as name=value pairs separated by &',
      'In a cookie stored by the browser',
      'In the <head> of the next page',
    ],
    answer: 1,
    explain: 'GET puts the data in the URL query. POST puts it in the request body (encoded according to enctype).',
  },
  {
    id: 'hc-m10',
    q: 'Users must pick exactly one size: S, M or L. Which input setup fits best?',
    options: [
      'Three checkboxes with different names',
      'Three text inputs',
      'Three radio buttons that share the same name',
      'One password input',
    ],
    answer: 2,
    explain: 'Radio buttons with the same name are exclusive choices (only one can be selected). Checkboxes are non-exclusive.',
  },
  {
    id: 'hc-m11',
    q: 'Which <meta> tag is needed for media queries to work correctly on mobile devices?',
    options: [
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<meta name="description" content="...">',
      '<meta property="og:title" content="...">',
    ],
    answer: 1,
    explain: 'The viewport meta tag makes the page width follow the device width. Without it, media queries do not work correctly.',
  },
  {
    id: 'hc-m12',
    q: 'Which way of adding CSS lets several HTML pages share the same style rules?',
    options: [
      'A style attribute on each element',
      'A <style> block in the <head> of one page',
      'A <script> tag at the end of the body',
      'An external .css file linked with <link rel="stylesheet">',
    ],
    answer: 3,
    explain: 'An external stylesheet is a separate file, so any page can link it. Inline styles apply to one tag, internal styles to one page.',
  },
  {
    id: 'hc-m13',
    q: 'What does the selector ul > li select?',
    options: [
      'Only <li> elements that are direct children of a <ul>',
      'Every <li> inside a <ul>, at any depth',
      'The first <li> that comes right after a <ul>',
      'All <ul> elements and all <li> elements',
    ],
    answer: 0,
    explain: '> is the child combinator (direct children only). "ul li" (space) would be the descendant selector (any depth).',
  },
  {
    id: 'hc-m14',
    q: 'The element is <p id="intro" class="text">. The CSS file contains #intro { color: blue; } and, written after it, .text { color: green; }. Which color is the text?',
    options: [
      'Green, because the rule written later always wins',
      'Green, because class selectors are stronger than ID selectors',
      'Blue, because an ID selector is more specific than a class selector',
      'Black, the browser default',
    ],
    answer: 2,
    explain: 'Specificity is checked before source order. ID > class, so blue wins even though the class rule comes later.',
  },
  {
    id: 'hc-m15',
    q: 'Two rules target the same element and have exactly the same specificity and importance. Which one is applied?',
    options: ['The one defined first', 'The one defined later in the source order', 'The one with fewer properties', 'Neither: the browser default is used'],
    answer: 1,
    explain: 'Source order is the last level of the cascade: the rule defined later takes priority.',
  },
  {
    id: 'hc-m16',
    q: 'In the CSS box model, what is padding?',
    options: [
      'Space outside the border, between this element and others',
      'The thickness of the border line',
      'The width of the content area',
      'Space between the content and the border, inside the border',
    ],
    answer: 3,
    explain: 'Padding = space around the content, inside the border. Margin = space outside the border.',
  },
  {
    id: 'hc-m17',
    q: 'Given margin: 10px 20px 30px 40px; what is the left margin?',
    options: ['10px', '20px', '30px', '40px'],
    answer: 3,
    explain: 'The four values go clockwise: top 10px, right 20px, bottom 30px, left 40px.',
  },
  {
    id: 'hc-m18',
    q: 'A container has display: flex; flex-direction: row. Which property centers the items horizontally (on the main axis)?',
    options: ['justify-content: center', 'align-items: center', 'text-align: center', 'position: center'],
    answer: 0,
    explain: 'justify-content works on the main axis (horizontal for row). align-items works on the cross axis (vertical for row).',
  },
  {
    id: 'hc-m19',
    q: 'Which position value keeps an element in the same place on the screen while the page scrolls?',
    options: ['static', 'relative', 'fixed', 'absolute'],
    answer: 2,
    explain: 'fixed stays fixed when scrolling. static = normal flow, relative = relative to its original position, absolute = relative to an ancestor.',
  },
  {
    id: 'hc-m20',
    q: 'A box has background-size: cover. What happens to the background image?',
    options: [
      'It is shown in full inside the box, possibly leaving empty space',
      'It fills the whole box, and parts of the image may be cropped',
      'It is repeated as small tiles across the box',
      'It is shown at its original size in the top-left corner only',
    ],
    answer: 1,
    explain: 'cover = fills the area, may crop. contain = fits inside the area, may leave space.',
  },
]

const essays = [
  {
    id: 'hc-e1',
    prompt: 'Consider the following code:',
    code: trimCode(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cat Café</title>
</head>
<body>
  <h1>Cat Café</h1>
  <p>Coffee with <strong>real</strong> cats.</p>
  <img src="cat.jpg" alt="Grey cat sleeping on a sofa">
</body>
</html>`),
    parts: [
      { label: 'a', text: 'What is the difference between what goes inside <head> and what goes inside <body>?' },
      { label: 'b', text: 'What does the viewport meta tag (line 5) do, and why is it needed?' },
      { label: 'c', text: 'Why does the <img> element have an alt attribute?' },
    ],
    modelAnswer: [
      { label: 'a', text: '<head> contains metadata about the document (character encoding, viewport, title, description, links to CSS/fonts). It is not shown as page content (the title appears in the browser tab). <body> contains the visible content of the page: headings, paragraphs, images, ...' },
      { label: 'b', text: 'It makes the page width follow the width of the device (width=device-width) with no zoom at start (initial-scale=1.0). It is needed for responsive design: without it mobile browsers render a wide desktop page and media queries do not work correctly.' },
      { label: 'c', text: 'alt gives a text alternative for the image. Screen readers read it to blind/visually impaired users, and it is shown if the image cannot load. It makes the page accessible (Perceivable principle).' },
    ],
    keyPoints: [
      'head = metadata, not visible page content',
      'body = visible content',
      'viewport: page width follows device width / initial zoom 1',
      'viewport needed for responsive design / media queries on mobile',
      'alt = text alternative for screen readers (accessibility)',
      'alt shown if image fails to load',
    ],
  },
  {
    id: 'hc-e2',
    prompt: 'Consider the following code:',
    code: trimCode(`
<form action="https://example.com/register" method="post">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="18" max="99">

  <button type="submit">Register</button>
</form>`),
    parts: [
      { label: 'a', text: 'What happens with the data when the user clicks the button? Where is it sent and how?' },
      { label: 'b', text: 'What do the attributes required, min and max do?' },
      { label: 'c', text: 'What would change if method="post" was replaced with method="get"?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The button has type="submit", so the form makes an HTTP request to the URL in action (https://example.com/register). Because method="post", the data is sent in the body of the request as name=value pairs (email=..., age=...), using the name attributes of the fields.' },
      { label: 'b', text: 'They are validation attributes. required: the email field must be filled before the form can be sent. min/max: the age must be a number between 18 and 99. The browser checks these before submitting.' },
      { label: 'c', text: 'With GET the data would be sent in the URL query string, e.g. ?email=...&age=..., as name=value pairs separated by &, instead of in the request body. The data becomes visible in the URL.' },
    ],
    keyPoints: [
      'submit sends an HTTP request to the action URL',
      'POST: data in the request body',
      'data sent as name=value pairs based on the name attributes',
      'required = field must be filled',
      'min/max = allowed number range (18–99)',
      'GET: data in the URL query string, separated by &',
    ],
  },
  {
    id: 'hc-e3',
    prompt: 'Consider the following code:',
    code: trimCode(`
<header>
  <h1>Kažigram</h1>
  <nav>
    <ul>
      <li><a href="#feed">Feed</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="https://duckduckgo.com/" target="_blank">Search</a></li>
    </ul>
  </nav>
</header>`),
    parts: [
      { label: 'a', text: 'Why is the menu built with <nav>, <ul>, <li> and <a>?' },
      { label: 'b', text: 'Explain the difference between the three href values on lines 5, 6 and 7.' },
      { label: 'c', text: 'What does target="_blank" do?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'A menu is a list of links. <nav> semantically marks the block as navigation, <ul>/<li> give it a list structure (one item per link) and <a> creates each link. This is the recommended, semantic way to build menus.' },
      { label: 'b', text: '#feed jumps to the element with id="feed" on the same page. about.html is a relative URL: a file relative to the folder of the current page on the same server. https://duckduckgo.com/ is an absolute URL: the full address of another site.' },
      { label: 'c', text: 'It opens the link in a new browser window/tab instead of the current one.' },
    ],
    keyPoints: [
      'menu = list of links',
      'nav = semantic navigation area; ul/li = list; a = link',
      '#feed = element with id feed on the same page',
      'about.html = relative URL (same server/folder)',
      'https://... = absolute URL (full address)',
      '_blank = opens in a new tab/window',
    ],
  },
  {
    id: 'hc-e4',
    prompt: 'Consider the following code:',
    code: trimCode(`
<!-- HTML -->
<p id="intro" class="highlight" style="color: purple;">Hello</p>

/* CSS file */
p          { color: black; }
.highlight { color: green; }
#intro     { color: blue; }`),
    parts: [
      { label: 'a', text: 'Which color will "Hello" have? Why?' },
      { label: 'b', text: 'If the style attribute is removed from the <p>, which color will it have? Explain using specificity.' },
      { label: 'c', text: 'What does "cascading" mean in Cascading Style Sheets?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Purple. The inline style (style attribute) has a higher priority than rules from the stylesheet; only !important would beat it.' },
      { label: 'b', text: 'Blue. All three rules target the element. Specificity order is inline > id > class > element, so #intro (ID) beats .highlight (class) and p (element).' },
      { label: 'c', text: 'Cascading decides which rule applies when several rules target the same element. Declarations flow down from different sources and are resolved into one result using origin/importance, specificity and source order.' },
    ],
    keyPoints: [
      'purple: inline style has highest priority (except !important)',
      'without inline: blue',
      'ID more specific than class and element',
      'cascading = resolving conflicting rules for the same element into one result',
      'levels: origin/importance, specificity, source order',
    ],
  },
  {
    id: 'hc-e5',
    prompt: 'Consider the following code:',
    code: trimCode(`
<div class="gallery">
  <div class="item">A</div>
  <div class="item featured">B</div>
  <div class="item">C</div>
</div>

.gallery {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.gallery .item     { flex: 1; }
.gallery .featured { flex: 2; }`),
    parts: [
      { label: 'a', text: 'Which element is the flex container and which are the flex items?' },
      { label: 'b', text: 'What do flex-direction: row and align-items: center do here?' },
      { label: 'c', text: 'How is the width shared between A, B and C? Why does B get flex: 2 even though it also has the class item?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The div with class "gallery" is the flex container because it has display: flex. Its direct children A, B and C are the flex items.' },
      { label: 'b', text: 'flex-direction: row places the items next to each other horizontally (main axis = horizontal). align-items: center centers them on the cross axis, i.e. vertically.' },
      { label: 'c', text: 'Items grow to fill the space: A and C get one share each and B gets two shares (1 : 2 : 1), so B is twice as wide as A or C. Both .gallery .item and .gallery .featured have the same specificity, and the .featured rule is written later, so its flex: 2 wins for B (source order).' },
    ],
    keyPoints: [
      '.gallery = flex container (display: flex)',
      'A, B, C = flex items (direct children)',
      'row = horizontal main axis',
      'align-items center = centered on the cross axis (vertically)',
      'B twice as wide as A and C (1:2:1)',
      'same specificity, later rule wins (source order)',
    ],
  },
  {
    id: 'hc-e6',
    prompt: 'Consider the following code:',
    code: trimCode(`
body {
  background-color: pink;
}
.menu {
  display: none;
}

@media screen and (min-width: 768px) {
  body {
    background-color: lightgreen;
  }
  .menu {
    display: block;
  }
}`),
    parts: [
      { label: 'a', text: 'What does the page look like on a phone 400px wide, and on a laptop 1200px wide?' },
      { label: 'b', text: 'What is the purpose of media queries in web design?' },
      { label: 'c', text: 'What must be included in the HTML <head> for this to work correctly on mobile devices?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'On a 400px phone the media query does not apply (400 < 768): the background is pink and .menu is hidden (display: none). On a 1200px laptop the condition is true (screen and at least 768px wide): the background becomes lightgreen and .menu is shown (display: block).' },
      { label: 'b', text: 'Media queries apply different CSS rules for different media types and conditions (viewport width/height, orientation, resolution). They make the layout responsive so it adapts to different screen sizes.' },
      { label: 'c', text: 'The viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1.0">.' },
    ],
    keyPoints: [
      'phone 400px: pink, menu hidden',
      'laptop 1200px: lightgreen, menu visible',
      'min-width 768px = 768px or wider',
      'media queries = different rules for different screen sizes/conditions (responsive)',
      'viewport meta tag needed',
    ],
  },
  {
    id: 'hc-e7',
    prompt: 'Consider the following code:',
    code: trimCode(`
.card {
  display: inline-block;
  width: 200px;
  padding: 20px;
  border: 2px solid #555;
  margin: 0px 20px 40px 30px;
}`),
    parts: [
      { label: 'a', text: 'Explain the difference between padding and margin in this rule.' },
      { label: 'b', text: 'What is the margin on each side of the card?' },
      { label: 'c', text: 'Why is display: inline-block used here instead of display: inline?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'padding: 20px is space inside the border, between the content and the 2px border. margin is space outside the border, between the card and other elements.' },
      { label: 'b', text: 'The shorthand goes clockwise: top 0px, right 20px, bottom 40px, left 30px.' },
      { label: 'c', text: 'inline-block lets the cards sit next to each other in a line like inline elements, but unlike inline elements you can still give them a width and height (width: 200px works). With display: inline the width would be ignored.' },
    ],
    keyPoints: [
      'padding = inside the border',
      'margin = outside the border',
      'top 0, right 20, bottom 40, left 30 (clockwise)',
      'inline-block: stays in the line',
      'inline-block allows width/height; inline ignores width',
    ],
  },
  {
    id: 'hc-e8',
    prompt: 'A browser and a server exchange the following HTTP messages:',
    code: trimCode(`
GET /api/cats/7 HTTP/1.1
Host: www.kazhigram.fi

HTTP/1.1 200 OK
Content-Type: application/json

{ "id": 7, "name": "Toast", "age": 6 }`),
    parts: [
      { label: 'a', text: 'Which side starts this communication, and what does the request ask for?' },
      { label: 'b', text: 'What do "200 OK" and "Content-Type" tell the client? What would a 404 status mean?' },
      { label: 'c', text: "Which HTTP methods would you use to change Toast's age, and to delete Toast?" },
    ],
    modelAnswer: [
      { label: 'a', text: 'The client (the browser) always starts an HTTP transaction. It sends a GET request, i.e. it asks to read the resource /api/cats/7 (cat number 7) from the server www.kazhigram.fi.' },
      { label: 'b', text: '200 OK: the operation completed successfully and the resource is served. Content-Type is the MIME type of the body: here JSON data. 404 Not Found would mean the requested resource does not exist on the server (a client error).' },
      { label: 'c', text: 'PUT to update the existing resource (change the age) and DELETE to remove it.' },
    ],
    keyPoints: [
      'client initiates the transaction',
      'GET = read resource /api/cats/7',
      '200 = success',
      'Content-Type = MIME type / format of the body (JSON)',
      '404 = resource not found',
      'PUT = update, DELETE = delete',
    ],
  },
  {
    id: 'hc-e9',
    prompt: 'Consider the following code:',
    code: trimCode(`
<div class="post">
  <h2>Winter is coming</h2>
  <p>Toast found <span class="tag">#snow</span> today.</p>
</div>`),
    parts: [
      { label: 'a', text: 'Which elements are block elements and which are inline? What is the difference?' },
      { label: 'b', text: 'What meaning do <div> and <span> have? Why are they used here?' },
      { label: 'c', text: 'Write a CSS selector that targets only the <span> elements inside .post, and explain how it works.' },
    ],
    modelAnswer: [
      { label: 'a', text: '<div>, <h2> and <p> are block elements: they take the full width and force a new line before and after. <span> is inline: it only takes the width it needs and does not break the line, so #snow stays inside the sentence.' },
      { label: 'b', text: 'They have no meaning; they are semantically neutral containers. <div> (block) groups the post; <span> (inline) wraps a piece of text. They are used together with the class attributes so CSS/JavaScript can target them.' },
      { label: 'c', text: '.post span (or .post .tag). The space is the descendant selector: it selects every span inside an element with class post, at any depth.' },
    ],
    keyPoints: [
      'div, h2, p = block (full width, new line)',
      'span = inline (only needed width, no new line)',
      'div and span are semantically neutral',
      'used as containers/hooks for CSS via class',
      'selector .post span or .post .tag (descendant)',
    ],
  },
  {
    id: 'hc-e10',
    prompt: 'Consider the following code:',
    code: trimCode(`
.discount {
  text-decoration: line-through red wavy;
}

.banner {
  height: 300px;
  background-image: url("cat.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}`),
    parts: [
      { label: 'a', text: 'Rewrite the .discount rule using the individual text-decoration properties.' },
      { label: 'b', text: 'Explain what each background property in .banner does.' },
      { label: 'c', text: 'What would change if background-repeat: no-repeat was removed? And if contain was changed to cover?' },
    ],
    modelAnswer: [
      { label: 'a', text: '.discount { text-decoration-line: line-through; text-decoration-color: red; text-decoration-style: wavy; }' },
      { label: 'b', text: 'background-image sets cat.jpg as the background. background-repeat: no-repeat shows it only once. background-size: contain scales it so the whole image fits inside the box (there may be empty space). background-position: center places it in the middle.' },
      { label: 'c', text: 'Without no-repeat the default repeat is used: the image is tiled to fill the empty area. With cover the image fills the whole box with no empty space, but parts of it may be cropped.' },
    ],
    keyPoints: [
      'text-decoration-line: line-through',
      'text-decoration-color: red',
      'text-decoration-style: wavy',
      'no-repeat = image shown once',
      'contain = whole image fits inside, may leave space',
      'center = image centered',
      'default repeat tiles the image',
      'cover fills the area and may crop',
    ],
  },
]

export default {
  id: 'html-css',
  title: 'HTML & CSS',
  short: 'HTML & CSS',
  slides: ['1 – Intro to the web', '2 – HTML', '3 – CSS'],
  intro: 'How the web works (Internet, client–server, HTTP), HTML structure and forms, and CSS selectors, cascade and layout.',
  theory,
  mcq,
  essays,
}
