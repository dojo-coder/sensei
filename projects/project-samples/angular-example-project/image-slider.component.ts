import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngIf="images.length === 0">No images to display.</p>

    <div class="wrapper" *ngIf="images.length > 0">
      <img
        class="image"
        [src]="images[currentImage]"
        [alt]="'Slide ' + (currentImage + 1)"
      />
      <div class="controls">
        <button
          class="button"
          [disabled]="isPrevDisabled"
          (click)="prev()"
        >
          Previous
        </button>
        <span class="counter">{{ currentImage + 1 }} / {{ images.length }}</span>
        <button
          class="button"
          [disabled]="isNextDisabled"
          (click)="next()"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .image {
        width: 400px;
        height: 300px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }

      .controls {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .button {
        padding: 8px 18px;
        font-size: 15px;
        border: none;
        border-radius: 8px;
        background: #4f46e5;
        color: white;
        cursor: pointer;
      }

      .button:disabled {
        background: #c7c7d1;
        cursor: not-allowed;
      }

      .counter {
        min-width: 52px;
        text-align: center;
        color: #444;
        font-variant-numeric: tabular-nums;
      }
    `,
  ],
})
export class ImageSliderComponent {
  @Input() images: string[] = [];

  currentImage = 0;

  get isPrevDisabled(): boolean {
    return this.currentImage === 0;
  }

  get isNextDisabled(): boolean {
    return this.currentImage === this.images.length - 1;
  }

  prev(): void {
    if (!this.isPrevDisabled) this.currentImage--;
  }

  next(): void {
    if (!this.isNextDisabled) this.currentImage++;
  }
}
