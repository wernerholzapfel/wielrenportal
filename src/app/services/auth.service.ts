import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user$ = _firebaseAuth.authState;
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpRegular(email, password) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
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

  getToken() {
      return  this._firebaseAuth.auth.currentUser.getIdToken(true);
  }

}
