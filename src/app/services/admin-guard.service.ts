import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminGuardService {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate() {
    return this.authService.getTokenResult().then((user) => {
      if (user.claims.admin) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }).catch(() => {
      this.router.navigate(['/login']);
      return Observable.of(false);
    });
  }
}
