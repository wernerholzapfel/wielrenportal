import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ITour} from '../../models/tour.model';

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
export const DELETE_RIDER_FROM_TEAM = '[RIDERS] Delete Rider From Team';
export const DELETE_RIDER_FROM_TEAM_SUCCESS = '[RIDERS] Delete Rider From Team Success';
export const DELETE_RIDER_FROM_TEAM_FAILURE = '[RIDERS] Delete Rider From Team Failure';
export const UPDATE_RIDER_FROM_TEAM = '[RIDERS] Update Rider From Team';
export const UPDATE_RIDER_FROM_TEAM_SUCCESS = '[RIDERS] Update Rider From Team Success';
export const UPDATE_RIDER_FROM_TEAM_FAILURE = '[RIDERS] Update Rider From Team Failure';

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

export class DeleteRiderFromTeam implements Action {
  readonly type = DELETE_RIDER_FROM_TEAM;

  constructor(public payload: string) {
  }
}

export class DeleteRiderFromTeamSuccess implements Action {
  readonly type = DELETE_RIDER_FROM_TEAM_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteRiderFromTeamFailure implements Action {
  readonly type = DELETE_RIDER_FROM_TEAM_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class UpdateRiderFromTeam implements Action {
  readonly type = UPDATE_RIDER_FROM_TEAM;

  constructor(public payload: any) {
  }
}

export class UpdateRiderFromTeamSuccess implements Action {
  readonly type = UPDATE_RIDER_FROM_TEAM_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateRiderFromTeamFailure implements Action {
  readonly type = UPDATE_RIDER_FROM_TEAM_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


