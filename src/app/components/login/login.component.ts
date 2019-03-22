import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {ParticipantService} from '../../services/participant.service';
import {IAppState} from '../../store/store';
import * as fromParticipantForm from '../../store/participantform/participantform.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
    displayName: '',
    teamName: '',
  };

  constructor(public authService: AuthService,
              public participantService: ParticipantService,
              public snackBar: MatSnackBar,
              private router: Router,
              private store: Store<IAppState>) {
  }

  userForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    displayName: new FormControl('', [
      Validators.required,
    ]),
    teamName: new FormControl('', [
      Validators.required,
      Validators.maxLength(15)
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
        this.store.dispatch(new fromParticipantForm.ClearParticipantform());
        this.router.navigate(['/inschrijven']);
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
          if (res) {
            delete this.user.password;
            this.participantService.postParticipant({
              displayName: this.user.displayName,
              teamName: this.user.teamName,
              email: this.user.email
            }).subscribe(response => {
              console.log('user opgeslagen in database');
            });
            this.store.dispatch(new fromParticipantForm.ClearParticipantform());
            this.router.navigate(['/inschrijven']);
          }
        }
      )
      .catch((err) => {
        this.snackBar.open(err.message, 'OK', {});
        console.log('error: ' + err);
      });
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(new fromParticipantForm.ClearParticipantform());
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
