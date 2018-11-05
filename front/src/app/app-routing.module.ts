import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignComponent } from './sign/sign.component';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';
import { QrComponent } from './qr/qr.component';
import { ChannelComponent } from './channel/channel.component';
import { AccessComponent } from './access/access.component';


const routes: Routes = [
  // TODO: 제거
  { path: '', redirectTo: '/sign', pathMatch: 'full' },
  { path: 'sign', component: SignComponent },
  { path: 'create', component: CreateComponent },
  { path: 'main', component: MainComponent },
  { path: 'qr', component: QrComponent },
  { path: 'channel/:room_name', component: ChannelComponent},
  { path: 'channel', component: ChannelComponent},
  { path: 'access/:hash', component: AccessComponent},
  { path: '**', redirectTo: '/sign' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
