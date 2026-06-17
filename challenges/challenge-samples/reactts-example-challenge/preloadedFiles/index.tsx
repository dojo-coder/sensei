import React from "react";
import ReactDOM from "react-dom/client";
import ImageSlider from "./ImageSlider";

const images = [
  "https://i.imgur.com/rmydi2w.jpg",
  "https://i.imgur.com/rAFqZiM.jpg",
  "https://i.imgur.com/Fpw5KKY.jpg",
  "https://i.imgur.com/IbYRmoW.jpg",
  "https://i.imgur.com/9poVrgA.jpg",
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ImageSlider images={images} />
  </React.StrictMode>
);
