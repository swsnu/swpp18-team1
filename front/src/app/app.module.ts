import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QrComponent } from './qr/qr.component';

@NgModule({
  declarations: [
    AppComponent,
    QrComponent
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
