import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// FormsModule / ReactiveFormsModule ship pre-imported because this file is
// LOCKED in the editor: without them the first template that uses [(ngModel)]
// or formGroup fails at BOOTSTRAP rather than at build — the build still says
// "Compiled successfully" while the preview renders a blank page, and neither
// the user nor the AI assistant is able to add the import to fix it.
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
