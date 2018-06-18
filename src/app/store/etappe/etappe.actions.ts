import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {IEtappe} from '../../models/etappe.model';
import {IRider} from '../../models/rider.model';
import {ITeam} from '../../models/team.model';

export const FETCH_ETAPPELIST = '[ETAPPE] Fetch Etappelist';
export const FETCH_ETAPPELIST_SUCCESS = '[ETAPPE] Fetch Etappelist Success';
export const FETCH_ETAPPELIST_FAILURE = '[ETAPPE] Fetch Etappelist Failure';
export const FETCH_ETAPPE = '[ETAPPE] Fetch Etappe';
export const FETCH_ETAPPE_SUCCESS = '[ETAPPE] Fetch Etappe Success';
export const FETCH_ETAPPE_FAILURE = '[ETAPPE] Fetch Etappe Failure';

export class FetchEtappe implements Action {
  readonly type = FETCH_ETAPPE;

  constructor() {
  }
}

export class FetchEtappeSuccess implements Action {
  readonly type = FETCH_ETAPPE_SUCCESS;

  constructor(public payload: IEtappe) {
  }
}

export class FetchEtappeFailure implements Action {
  readonly type = FETCH_ETAPPE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

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


