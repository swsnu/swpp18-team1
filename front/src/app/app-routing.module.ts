import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/sign', pathMatch: 'full' },
  { path: 'sign'},
  { path: 'create'},
  { path: 'select'},
  { path: 'qr'},
  { path: 'channel'},
  { path: '**', redirectTo: '/sign' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
