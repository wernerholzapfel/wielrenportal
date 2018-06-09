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
      return this.db.list('/server/stand')
        .switchMap(participanttableResponse =>
          Observable.of(new participanttable.FetchParticipanttableSuccess(participanttableResponse))
        )
        .catch(err => Observable.of(new participanttable.FetchParticipanttableFailure(err)));
    });
}
