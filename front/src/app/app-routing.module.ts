import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/service/auth-guard.service';

import { SignComponent } from './sign/sign.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { QrComponent } from './qr/qr.component';
import { ChannelComponent } from './channel/channel.component';
import { AccessComponent } from './access/access.component';


const routes: Routes = [
  // TODO: 제거
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SignComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuardService] },
  { path: 'qr', component: QrComponent, canActivate: [AuthGuardService] },
  { path: 'channel/:channel_hash', component: ChannelComponent, canActivate: [AuthGuardService]},
  { path: 'access/:channel_hash', component: AccessComponent},
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
