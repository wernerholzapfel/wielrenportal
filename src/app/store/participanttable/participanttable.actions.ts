import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IParticipanttable} from '../../models/participanttable.model';

export const FETCH_PARTICIPANTTABLE = '[PARTICIPANTABLE] Fetch Participanttable';
export const FETCH_PARTICIPANTTABLE_BY_ID = '[PARTICIPANTABLE] Fetch Participanttable by id';
export const FETCH_PARTICIPANTTABLE_SUCCESS = '[PARTICIPANTABLE] Fetch Participanttable Success';
export const FETCH_PARTICIPANTTABLE_FAILURE = '[PARTICIPANTABLE] Fetch Participanttable Failure';

export class FetchParticipanttable implements Action {
  readonly type = FETCH_PARTICIPANTTABLE;

  constructor() {
  }
}

export class FetchParticipanttableSuccess implements Action {
  readonly type = FETCH_PARTICIPANTTABLE_SUCCESS;

  constructor(public payload: IParticipanttable[]) {
  }
}

export class FetchParticipanttableFailure implements Action {
  readonly type = FETCH_PARTICIPANTTABLE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

// todo ?
export class FetchParticipanttableById implements Action {
  readonly type = FETCH_PARTICIPANTTABLE_BY_ID;

  constructor(public payload: string) {
  }
}


