import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ITour} from '../../models/tour.model';
import {IParticipant} from '../../models/participant.model';

export const FETCH_PARTICIPANT = '[TOUR] Fetch Participant';
export const FETCH_PARTICIPANT_SUCCESS = '[TOUR] Fetch Participant Success';
export const FETCH_PARTICIPANT_FAILURE = '[TOUR] Fetch Participant Failure';

export class FetchParticipant implements Action {
  readonly type = FETCH_PARTICIPANT;

  constructor() {
  }
}

export class FetchParticipantSuccess implements Action {
  readonly type = FETCH_PARTICIPANT_SUCCESS;

  constructor(public payload: IParticipant) {
  }
}

export class FetchParticipantFailure implements Action {
  readonly type = FETCH_PARTICIPANT_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}
