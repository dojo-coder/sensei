import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<image-slider [images]="images"></image-slider>`,
})
export class AppComponent {
  images = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];
}
