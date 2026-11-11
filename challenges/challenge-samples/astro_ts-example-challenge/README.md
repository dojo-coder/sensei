Build the Astro page at `/` so that it is a complete HTML document that shows a heading with the text `Hello, World!`.

### Rules & clarifications

- The heading is an `<h1>` element inside `<body>`, and its text is exactly `Hello, World!`, with the capital letters, the comma and the exclamation mark.
- The root element is `<html lang="en">`.
- The `<head>` contains `<meta charset="UTF-8" />`.
- Write the code in `src/pages/index.astro`. The tests render the page to HTML and check the document.
- The tests check the content of the page, not its styling: no CSS is needed.
- The rendered HTML has this structure:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Astro</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

### Example

Open the page → the heading `Hello, World!` is shown.
