import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignComponent } from './sign/sign.component';
import { CreateComponent } from './create/create.component';
import { SelectComponent } from './select/select.component';
import { QrComponent } from './qr/qr.component';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { AccessComponent } from './access/access.component';


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    CreateComponent,
    SelectComponent,
    QrComponent,
    ChannelComponent,
    DirectMessageComponent,
    AccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
