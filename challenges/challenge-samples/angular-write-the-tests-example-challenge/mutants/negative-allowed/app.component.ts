import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  count = 0;

  get canDecrement(): boolean {
    return true;
  }

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }

  reset(): void {
    this.count = 0;
  }
}
