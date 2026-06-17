import { Component, Input } from "@angular/core";

@Component({
  selector: "image-slider",
  templateUrl: "./ImageSlider.component.html",
})
export class ImageSliderComponent {
  @Input() images: string[] = [];

  currentImage = 0;

  get isPrevDisabled() {
    return this.currentImage === 0;
  }
  get isNextDisabled() {
    return (
      this.images.length === 0 || this.currentImage >= this.images.length - 1
    );
  }

  nextImage() {
    if (this.currentImage < this.images.length - 1) this.currentImage++;
  }
  previousImage() {
    if (this.currentImage > 0) this.currentImage--;
  }
}
