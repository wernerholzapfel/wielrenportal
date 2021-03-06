import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ITour} from '../../models/tour.model';
import {IRider} from '../../models/rider.model';
import {ITeam} from '../../models/team.model';

export const FETCH_TOURLIST = '[TOUR] Fetch Tourlist';
export const FETCH_TOURLIST_SUCCESS = '[TOUR] Fetch Tourlist Success';
export const FETCH_TOURLIST_FAILURE = '[TOUR] Fetch Tourlist Failure';
export const FETCH_TOUR = '[TOUR] Fetch Tour';
export const FETCH_TOUR_BY_ID = '[TOUR] Fetch Tour by id';
export const FETCH_TOUR_SUCCESS = '[TOUR] Fetch Tour Success';
export const FETCH_TOUR_FAILURE = '[TOUR] Fetch Tour Failure';
export const Set_CURRENT_RIDER_AS_SELECTED = '[RIDERS] Set Rider selected';
export const Set_CURRENT_RIDER_AS_SELECTED_SUCCESS = '[RIDERS] Set Rider selected Success';
export const SAVE_RIDER_TO_TEAM = '[RIDERS] Save Rider To Team';
export const SAVE_RIDER_TO_TEAM_SUCCESS = '[RIDERS] Save Rider To Team Success';
export const SAVE_RIDER_TO_TEAM_FAILURE = '[RIDERS] Save Rider To Team Failure';

export class SetCurrentRiderAsSelected implements Action {
  readonly type = Set_CURRENT_RIDER_AS_SELECTED;

  constructor(public payload: any) {
  }
}

  export class SetCurrentRiderAsSelectedSuccess implements Action {
  readonly type = Set_CURRENT_RIDER_AS_SELECTED_SUCCESS;

  constructor(public payload: any) {
  }
}

export class FetchTour implements Action {
  readonly type = FETCH_TOUR;

  constructor() {
  }
}

export class FetchTourSuccess implements Action {
  readonly type = FETCH_TOUR_SUCCESS;

  constructor(public payload: ITour) {
  }
}

export class FetchTourFailure implements Action {
  readonly type = FETCH_TOUR_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class FetchTourList implements Action {
  readonly type = FETCH_TOURLIST;

  constructor() {
  }
}

export class FetchTourById implements Action {
  readonly type = FETCH_TOUR_BY_ID;

  constructor(public payload: string) {
  }
}

export class FetchTourListSuccess implements Action {
  readonly type = FETCH_TOURLIST_SUCCESS;

  constructor(public payload: ITour[]) {
  }
}

export class FetchTourListFailure implements Action {
  readonly type = FETCH_TOURLIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class SaveRiderToTeam implements Action {
  readonly type = SAVE_RIDER_TO_TEAM;

  constructor(public payload: any) {
  }
}

export class SaveRiderToTeamSuccess implements Action {
  readonly type = SAVE_RIDER_TO_TEAM_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SaveRiderToTeamFailure implements Action {
  readonly type = SAVE_RIDER_TO_TEAM_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


