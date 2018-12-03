import { of } from 'rxjs';
import { User } from '../model/user';

export class mockUserService {

    user: User;

    isSignIn(): boolean {
        return true;
    }

    managerSignUp(username: string, password: string) {
        return of(true).toPromise();
    }
    
    managerSignIn(username: string, password: string) {
        return of(true).toPromise();
    }
}