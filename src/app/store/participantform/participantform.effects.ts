import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as participantform from './participantform.actions';
import {Observable} from 'rxjs';


import {PredictionService} from '../../services/prediction.service';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class ParticipantformEffects {
  constructor(private actions$: Actions,
              private predictionService: PredictionService) {
  }

  @Effect()
  fetchParticipantform$ = this.actions$
    .ofType<participantform.FetchParticipantform>(participantform.FETCH_PARTICIPANTFORM)
    .pipe(switchMap(action => {
      return this.predictionService.getPredictionsForUser(action.payload)
        .pipe(switchMap(participantformResponse =>
            of(new participantform.FetchParticipantformSuccess(participantformResponse))),
          catchError(err => of(new participantform.FetchParticipantformFailure(err))));
    }));
}
