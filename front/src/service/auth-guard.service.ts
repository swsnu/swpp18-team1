import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(public userService: UserService, public router: Router) {}
    canActivate(): boolean {
    if (!this.userService.isSignIn()) {
        this.router.navigate(['/signin']);
        return false;
    }
    return true;
    }
}