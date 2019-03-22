import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as participant from './participant.actions';

import {ParticipantService} from '../../services/participant.service';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class ParticipantEffects {
  constructor(private actions$: Actions,
              private participantService: ParticipantService) {
  }

  @Effect()
  fetchParticipant$ = this.actions$
    .pipe(
      ofType<participant.FetchParticipant>(participant.FETCH_PARTICIPANT),
      switchMap(action => {
        return this.participantService
          .getParticipant()
          .pipe(switchMap(participantResponse =>
              of(new participant.FetchParticipantSuccess(participantResponse))),
            catchError(err => of(new participant.FetchParticipantFailure(err))));
      }));

  // @Effect()
  // updateTour$ = this.actions$
  //   .ofType<tour.SetCurrentRiderAsSelected>(tour.FETCH_TOUR)
  //   .switchMap(action => Observable.of(new tour.FetchTourSuccess(action.payload)))
  //   .catch(err => Observable.of(new tour.FetchTourFailure(err)));
}
