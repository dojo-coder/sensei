Build the SvelteKit page at `/` so that it shows a single heading with the text `Hello, World!`.

### Rules & clarifications

- The heading is an `<h1>` element and its text is exactly `Hello, World!`, with the capital letters, the comma and the exclamation mark.
- The page has no other heading.
- Write the code in `src/routes/+page.svelte`, which uses `<script lang="ts">`.
- The tests check the content of the page, not its styling: no CSS is needed.
- The rendered HTML has this structure:

```html
<h1>Hello, World!</h1>
```

### Example

Open the page → the heading `Hello, World!` is shown.
