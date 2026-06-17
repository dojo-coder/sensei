Build an Astro + TypeScript page at `src/pages/index.astro` that renders an `<h1>` element containing the text `Hello, World!`.

The frontmatter must declare a typed `message: string` constant set to `'Hello, World!'`, and the body must render it inside an `<h1>`. The page must include the standard HTML scaffolding.

## Expected output

```astro
---
const message: string = 'Hello, World!';
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Astro</title>
  </head>
  <body>
    <h1>{message}</h1>
  </body>
</html>
```

Tests use Astro's experimental container API to render the page to a string and assert against the produced HTML.
