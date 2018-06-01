import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
    displayName: ''
  };

  constructor(public authService: AuthService, public snackBar: MatSnackBar, private router: Router) {
  }

  userForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    displayNameFormControl: new FormControl('', [
      Validators.required,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });

  matcher = new MyErrorStateMatcher();
  wachtwoordvergeten = false;

  ngOnInit() {
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/participants']);
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'OK', {});
        console.log('error: ' + err);
      });
  }

  sendPasswordResetEmail() {
    this.authService.sendPasswordResetEmail(this.user.email)
      .then((res) => {
        this.snackBar.open(res, 'OK', {});
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'OK', {});
        console.log('error: ' + err);
      });
  }

  signUpRegular() {
    this.authService.signUpRegular(this.user.email, this.user.password, this.user.displayName)
      .then((res) => {
        console.log(res);

        this.router.navigate(['/tourriders']);
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'OK', {});
        console.log('error: ' + err);
      });
  }

  logout() {
    this.authService.logout();
  }

  activateResetPassword(isTrue: boolean) {
    this.wachtwoordvergeten = isTrue;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
