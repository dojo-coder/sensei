import "./style.css";
import { createImageSlider } from "./imageSlider";

const images: string[] = [
  "https://i.imgur.com/rmydi2w.jpg",
  "https://i.imgur.com/rAFqZiM.jpg",
  "https://i.imgur.com/Fpw5KKY.jpg",
  "https://i.imgur.com/IbYRmoW.jpg",
  "https://i.imgur.com/9poVrgA.jpg",
];

const root = document.querySelector<HTMLDivElement>("#app");

if (root) {
  createImageSlider(root, images);
}
