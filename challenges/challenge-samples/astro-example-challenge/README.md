Build an Astro page at `src/pages/index.astro` that renders an `<h1>` element containing the text `Hello, World!`.

The page must include the standard HTML scaffolding (`<html lang="en">`, `<head>` with charset + title, `<body>`) and the `<h1>` must live inside `<body>`.

## Expected output

```astro
---
---

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

The Astro frontmatter (between the `---` fences) runs server-side and is empty for this challenge. Tests use Astro's experimental container API to render the page to a string and assert against the produced HTML.
