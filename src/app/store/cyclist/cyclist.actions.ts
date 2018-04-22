import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ICyclist} from '../../models/cyclist.model';

export const FETCH_CYCLISTS = '[CYCLISTS] Fetch Cyclists';
export const FETCH_CYCLISTS_SUCCESS = '[CYCLISTS] Fetch Cyclists Success';
export const FETCH_CYCLISTS_FAILURE = '[CYCLISTS] Fetch Cyclists Failure';

export class FetchCyclists implements  Action {
  readonly type = FETCH_CYCLISTS;

  constructor() {}
}

export class FetchCyclistsSuccess implements Action {
  readonly type = FETCH_CYCLISTS_SUCCESS;

  constructor(public payload: ICyclist[]) {}
}

export class FetchCyclistsFailure implements Action {
  readonly type = FETCH_CYCLISTS_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}
