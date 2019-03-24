import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IEtappe} from '../../models/etappe.model';
import {IRider} from '../../models/rider.model';
import {ITeam} from '../../models/team.model';

export const FETCH_ETAPPELIST = '[ETAPPE] Fetch Etappelist';
export const FETCH_ETAPPELIST_SUCCESS = '[ETAPPE] Fetch Etappelist Success';
export const FETCH_ETAPPELIST_FAILURE = '[ETAPPE] Fetch Etappelist Failure';

export class FetchEtappeList implements Action {
  readonly type = FETCH_ETAPPELIST;

  constructor(public payload: string) {
  }
}

export class FetchEtappeListSuccess implements Action {
  readonly type = FETCH_ETAPPELIST_SUCCESS;

  constructor(public payload: IEtappe[]) {
  }
}

export class FetchEtappeListFailure implements Action {
  readonly type = FETCH_ETAPPELIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export const FETCH_LATESTETAPPE = '[ETAPPE] Fetch Latest Etappe';
export const FETCH_LATESTETAPPE_SUCCESS = '[ETAPPE] Fetch Latest Etappe Success';
export const FETCH_LATESTETAPPE_FAILURE = '[ETAPPE] Fetch Latest Etappe Failure';

export class FetchLatestEtappe implements Action {
  readonly type = FETCH_LATESTETAPPE;

  constructor(public payload: string) {
  }
}

export class FetchLatestEtappeSuccess implements Action {
  readonly type = FETCH_LATESTETAPPE_SUCCESS;

  constructor(public payload: any[]) {
  }
}

export class FetchLatestEtappeFailure implements Action {
  readonly type = FETCH_LATESTETAPPE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


