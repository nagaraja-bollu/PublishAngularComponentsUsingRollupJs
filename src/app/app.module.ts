import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmiComponent } from './emi/emi.component';


@NgModule({
  declarations: [
    AppComponent,
    EmiComponent
  ],
  exports: [EmiComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
