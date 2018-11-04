import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignComponent } from './sign/sign.component';
import { CreateComponent } from './create/create.component';
import { SelectComponent } from './select/select.component';
import { QrComponent } from './qr/qr.component';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
<<<<<<< HEAD
import { AccessComponent } from './access/access.component';

=======
>>>>>>> bc133e20cdb2d6eb1c4857fb5e3ecb604f1e9814

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    CreateComponent,
    SelectComponent,
    QrComponent,
    ChannelComponent,
<<<<<<< HEAD
    DirectMessageComponent,
    AccessComponent,
=======
    DirectMessageComponent
>>>>>>> bc133e20cdb2d6eb1c4857fb5e3ecb604f1e9814
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
