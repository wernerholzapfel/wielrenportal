import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as participantform from './participantform.actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {PredictionService} from '../../services/prediction.service';

@Injectable()
export class ParticipantformEffects {
  constructor(private actions$: Actions,
              private predictionService: PredictionService) {
  }

  @Effect()
  fetchParticipantform$ = this.actions$
    .ofType<participantform.FetchParticipantform>(participantform.FETCH_PARTICIPANTFORM)
    .switchMap(action => {
      return this.predictionService.getPredictionsForUser(action.payload)
        .switchMap(participantformResponse =>
          Observable.of(new participantform.FetchParticipantformSuccess(participantformResponse))
        )
        .catch(err => Observable.of(new participantform.FetchParticipantformFailure(err)));
    });
}
