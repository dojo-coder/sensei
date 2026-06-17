import { Component } from '@angular/core';
import { ImageSliderComponent } from './image-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImageSliderComponent],
  template: `
    <main>
      <h1>Angular Image Slider</h1>
      <app-image-slider [images]="images" />
    </main>
  `,
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 32px 16px;
        font-family: system-ui, sans-serif;
      }

      h1 {
        margin: 0;
        font-size: 22px;
        color: #1f2937;
      }
    `,
  ],
})
export class AppComponent {
  images: string[] = [
    'https://i.imgur.com/rmydi2w.jpg',
    'https://i.imgur.com/rAFqZiM.jpg',
    'https://i.imgur.com/Fpw5KKY.jpg',
    'https://i.imgur.com/IbYRmoW.jpg',
    'https://i.imgur.com/9poVrgA.jpg',
  ];
}
