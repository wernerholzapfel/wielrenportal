import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {falseIfMissing} from 'protractor/built/util';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isLoggedIn().map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }).catch(() => {
      this.router.navigate(['']);
      return Observable.of(false);
    });
  }
}
