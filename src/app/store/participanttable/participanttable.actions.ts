import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IParticipanttable} from '../../models/participanttable.model';

export const FETCH_PARTICIPANTABLE = '[PARTICIPANTABLE] Fetch Participanttable';
export const FETCH_PARTICIPANTABLE_BY_ID = '[PARTICIPANTABLE] Fetch Participanttable by id';
export const FETCH_PARTICIPANTABLE_SUCCESS = '[PARTICIPANTABLE] Fetch Participanttable Success';
export const FETCH_PARTICIPANTABLE_FAILURE = '[PARTICIPANTABLE] Fetch Participanttable Failure';

export class FetchParticipanttable implements Action {
  readonly type = FETCH_PARTICIPANTABLE;

  constructor() {
  }
}

export class FetchParticipanttableSuccess implements Action {
  readonly type = FETCH_PARTICIPANTABLE_SUCCESS;

  constructor(public payload: IParticipanttable[]) {
  }
}

export class FetchParticipanttableFailure implements Action {
  readonly type = FETCH_PARTICIPANTABLE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


export class FetchParticipanttableById implements Action {
  readonly type = FETCH_PARTICIPANTABLE_BY_ID;

  constructor(public payload: string) {
  }
}


