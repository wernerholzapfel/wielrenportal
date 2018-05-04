import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;
  public isAdmin = false;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = _firebaseAuth.authState;

    this.user$.subscribe(user => {
      console.log('subscribe op user getriggerd')
      if (user) {
        this._firebaseAuth.auth.currentUser.getIdTokenResult(true).then(tokenResult => {
          this.isAdmin = tokenResult.claims.admin;
        });
      }
    });
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  updateProfile(displayName: string) {
    this.getToken().then(response => {
      response.updateProfile({displayName: displayName});
    });
  }

  signUpRegular(email, password, displayName) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        value.updateProfile({displayName: displayName});
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  isLoggedIn() {
    return this._firebaseAuth.authState;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) =>
        this.router.navigate(['/']));
  }

  getToken(): Promise<any> {
    if (this._firebaseAuth.auth.currentUser) {
      return this._firebaseAuth.auth.currentUser.getIdToken(true);
    } else {
      return Promise.resolve(false);
    }
  }

  getTokenResult(): Promise<any> {
    if (this._firebaseAuth.auth.currentUser) {
      return this._firebaseAuth.auth.currentUser.getIdTokenResult(true);
    } else {
      return Promise.resolve(false);
    }
  }
}
