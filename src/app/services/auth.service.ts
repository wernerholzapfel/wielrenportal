import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;
  public isAdmin = false;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = _firebaseAuth.authState;

    this.user$.subscribe(user => {
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
   return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
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

  sendPasswordResetEmail(email: string): Promise<any> {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email);
  }


}
