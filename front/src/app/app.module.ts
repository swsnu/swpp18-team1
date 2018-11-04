import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignComponent } from './sign/sign.component';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { AccessComponent } from './access/access.component';
import { QrComponent } from './qr/qr.component';

import { ChatService } from './services/chat.service';
// import { ApiInterceptor } from './HttpInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    CreateComponent,
    MainComponent,
    QrComponent,
    ChannelComponent,
    DirectMessageComponent,
    AccessComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
    HttpClientModule,
    // HttpModule,
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
