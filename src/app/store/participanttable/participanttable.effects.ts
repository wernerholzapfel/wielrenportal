import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as participanttable from './participanttable.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {IParticipanttable} from '../../models/participanttable.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class ParticipanttableEffects {
  constructor(private actions$: Actions, private db: AngularFireDatabase) {
  }

  @Effect()
  fetchParticipanttable$ = this.actions$
    .ofType<participanttable.FetchParticipanttable>(participanttable.FETCH_PARTICIPANTTABLE)
    .pipe(switchMap(action => {
      return this.db.list<IParticipanttable>(action.payload + '/stand/').valueChanges()
        .pipe(
          switchMap(participanttableResponse =>
            of(new participanttable.FetchParticipanttableSuccess(participanttableResponse))),
          catchError(err => of(new participanttable.FetchParticipanttableFailure(err))));
    }));

  @Effect()
  fetchLastupdated$ = this.actions$
    .ofType<participanttable.FetchLastUpdated>(participanttable.FETCH_LASTUPDATED)
    .pipe(switchMap(action => {
      return this.db.object<IParticipanttable[]>(action.payload + '/lastUpdated/').valueChanges()
        .pipe(switchMap(response =>
            of(new participanttable.FetchLastUpdatedSuccess(response))),
          catchError(err => of(new participanttable.FetchLastUpdatedFailure(err))));
    }));
}
