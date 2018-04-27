import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IRider} from '../../models/rider.model';

export const FETCH_RIDERS = '[RIDERS] Fetch Riders';
export const FETCH_RIDERS_SUCCESS = '[RIDERS] Fetch Riders Success';
export const FETCH_RIDERS_FAILURE = '[RIDERS] Fetch Riders Failure';

export class FetchRiders implements  Action {
  readonly type = FETCH_RIDERS;

  constructor() {}
}

export class FetchRidersSuccess implements Action {
  readonly type = FETCH_RIDERS_SUCCESS;

  constructor(public payload: IRider[]) {}
}

export class FetchRidersFailure implements Action {
  readonly type = FETCH_RIDERS_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}
