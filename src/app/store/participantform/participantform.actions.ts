import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

export const ADD_RIDER_TO_FORM = '[PARTICIPANTFORM] Add rider to form';
export const CLEAR_PARTICIPANTFORM = '[PARTICIPANTFORM] Clear form';
export const DELETE_RIDER_FROM_FORM = '[PARTICIPANTFORM] delete rider from form';
export const FETCH_PARTICIPANTFORM = '[PARTICIPANTFORM] Fetch Participantform';
export const FETCH_PARTICIPANTFORM_SUCCESS = '[PARTICIPANTFORM] Fetch Participantform Success';
export const FETCH_PARTICIPANTFORM_FAILURE = '[PARTICIPANTFORM] Fetch Participantform Failure';


export class AddRiderToForm implements Action {
  readonly type = ADD_RIDER_TO_FORM;

  constructor(public payload: any) {
  }
}

export class DeleteRiderFromForm implements Action {
  readonly type = DELETE_RIDER_FROM_FORM;

  constructor(public payload: any) {
  }
}
export class FetchParticipantform implements Action {
  readonly type = FETCH_PARTICIPANTFORM;

  constructor(public payload: string) {
  }
}

export class FetchParticipantformSuccess implements Action {
  readonly type = FETCH_PARTICIPANTFORM_SUCCESS;

  constructor(public payload: any[]) {
  }
}

export class ClearParticipantform implements Action {
  readonly type = CLEAR_PARTICIPANTFORM;

  constructor() {
  }
}

export class FetchParticipantformFailure implements Action {
  readonly type = FETCH_PARTICIPANTFORM_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}



