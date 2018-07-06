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


