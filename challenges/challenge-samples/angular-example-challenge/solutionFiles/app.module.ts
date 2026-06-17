import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ImageSliderComponent } from "./ImageSlider.component";
import { AppComponent } from "./App.component";

@NgModule({
  declarations: [AppComponent, ImageSliderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
