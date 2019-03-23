import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ITourrider} from '../../models/participant.model';
import {IRider} from '../../models/rider.model';

export const FETCH_TOURRIDERLIST = '[TOURRIDER] Fetch Tourriderlist';
export const FETCH_TOURRIDERLIST_SUCCESS = '[TOURRIDER] Fetch Tourriderlist Success';
export const FETCH_TOURRIDERLIST_FAILURE = '[TOURRIDER] Fetch Tourriderlist Failure';

export class FetchTourriderList implements Action {
  readonly type = FETCH_TOURRIDERLIST;

  constructor(public payload: string) {
  }
}

export class FetchTourriderListSuccess implements Action {
  readonly type = FETCH_TOURRIDERLIST_SUCCESS;

  constructor(public payload: IRider[]) {
  }
}

export class FetchTourriderListFailure implements Action {
  readonly type = FETCH_TOURRIDERLIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


