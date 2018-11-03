import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignComponent } from './sign/sign.component';
import { CreateComponent } from './create/create.component';
import { SelectComponent } from './select/select.component';
import { QrComponent } from './qr/qr.component';
import { ChannelComponent } from './channel/channel.component';


const routes: Routes = [
  // TODO: 제거
  { path: '', redirectTo: '/sign', pathMatch: 'full' },
  { path: 'sign', component: SignComponent },
  { path: 'create', component: CreateComponent },
  { path: 'select', component: SelectComponent },
  { path: 'qr', component: QrComponent },
  { path: 'channel/:room_name', component: ChannelComponent},
  { path: 'channel', component: ChannelComponent},
  { path: '**', redirectTo: '/sign' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
