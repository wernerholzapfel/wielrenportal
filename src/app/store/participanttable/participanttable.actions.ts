import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IParticipanttable} from '../../models/participanttable.model';

export const FETCH_PARTICIPANTTABLE = '[PARTICIPANTABLE] Fetch Participanttable';
export const FETCH_PARTICIPANTTABLE_SUCCESS = '[PARTICIPANTABLE] Fetch Participanttable Success';
export const FETCH_PARTICIPANTTABLE_FAILURE = '[PARTICIPANTABLE] Fetch Participanttable Failure';
export const FETCH_LASTUPDATED = '[PARTICIPANTABLE] Fetch Lastupdated';
export const FETCH_LASTUPDATED_SUCCESS = '[PARTICIPANTABLE] Fetch Lastupdated Success';
export const FETCH_LASTUPDATED_FAILURE = '[PARTICIPANTABLE] Fetch Lastupdated Failure';

export class FetchParticipanttable implements Action {
  readonly type = FETCH_PARTICIPANTTABLE;

  constructor(public payload: String) {
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

export class FetchLastUpdated implements Action {
  readonly type = FETCH_LASTUPDATED;

  constructor(public payload: String) {
  }
}

export class FetchLastUpdatedSuccess implements Action {
  readonly type = FETCH_LASTUPDATED_SUCCESS;

  constructor(public payload: IParticipanttable[]) {
  }
}

export class FetchLastUpdatedFailure implements Action {
  readonly type = FETCH_LASTUPDATED_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}



