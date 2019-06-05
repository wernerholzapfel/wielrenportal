import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParticipantService} from '../../services/participant.service';
import {getParticipant} from '../../store/participant/participant.reducer';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FetchParticipantSuccess} from '../../store/participant/participant.actions';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  unsubscribe = new Subject<void>();

  profileForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
    ]),
    displayName: new FormControl('', [
      Validators.required,
    ]),
    teamName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25)
    ]),
  });

  constructor(private store: Store<IAppState>, private participantService: ParticipantService,  public snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.store.select(getParticipant).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response) {
        this.profileForm.controls['id'].setValue(response.id);
        this.profileForm.controls['displayName'].setValue(response.displayName);
        this.profileForm.controls['teamName'].setValue(response.teamName);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit() {
    this.participantService.postParticipant(this.profileForm.value).subscribe(response => {
      this.snackBar.open('Het opslaan is gelukt', 'OK', {});
      this.store.dispatch(new FetchParticipantSuccess(response));
    }, error => {
      this.snackBar.open('Er heeft een fout opgetreden', 'OK', {});
    });
  }
}
