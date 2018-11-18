import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
=======
>>>>>>> a856710f89849e36b86c3858ea4d0a320dbc5c1e

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignComponent } from './sign/sign.component';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';
import { ChannelComponent } from './channel/channel.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { AccessComponent } from './access/access.component';
import { QrComponent } from './qr/qr.component';


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
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
