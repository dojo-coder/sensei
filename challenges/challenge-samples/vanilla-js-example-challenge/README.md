Write the function `imageSlider(images)` in plain JavaScript, without a framework. It adds an image slider to the page: one image at a time from a list, and two buttons, **Previous** and **Next**, for moving through the list.

### Rules & clarifications

- The function receives `images`, a list of image URLs with at least one element, and adds the slider to the `<body>` of the page.
- There is a single `<img>` element. At the start, its `src` is the first URL in `images`.
- Under the image there are two buttons with the texts `Previous` and `Next`, in this order.
- When the **Next** button is clicked, the `src` of the image changes to the next URL in the list. When the **Previous** button is clicked, it changes to the previous URL.
- The **Previous** button is disabled while the first image is shown. The **Next** button is disabled while the last image is shown.
- The tests check the behaviour, not the styling: no CSS is needed.
- The rendered HTML has this structure:

```html
<div>
    <img width="200" height="250" alt="Image 1" />
    <button>Previous</button>
    <button>Next</button>
</div>
```

### Examples

For a list `images` with 3 URLs:

- At the start, the first image is shown, **Previous** is disabled and **Next** is enabled.
- Click **Next** twice → the third image is shown and **Next** is disabled.
- Then click **Previous** once → the second image is shown and both buttons are enabled.
