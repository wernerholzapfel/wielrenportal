import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as participanttable from './participanttable.actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {ParticipantService} from '../../services/participant.service';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@Injectable()
export class ParticipanttableEffects {
  constructor(private actions$: Actions, private db: AngularFireDatabase) {
  }

  @Effect()
  fetchParticipanttable$ = this.actions$
    .ofType<participanttable.FetchParticipanttable>(participanttable.FETCH_PARTICIPANTTABLE)
    .switchMap(action => {
      return this.db.list( action.payload + '/stand/')
        .switchMap(participanttableResponse =>
          Observable.of(new participanttable.FetchParticipanttableSuccess(participanttableResponse))
        )
        .catch(err => Observable.of(new participanttable.FetchParticipanttableFailure(err)));
    });

  @Effect()
  fetchLastupdated$ = this.actions$
    .ofType<participanttable.FetchLastUpdated>(participanttable.FETCH_LASTUPDATED)
    .switchMap(action => {
      return this.db.object( action.payload + '/lastUpdated/')
        .switchMap(response =>
          Observable.of(new participanttable.FetchLastUpdatedSuccess(response))
        )
        .catch(err => Observable.of(new participanttable.FetchLastUpdatedFailure(err)));
    });

}
