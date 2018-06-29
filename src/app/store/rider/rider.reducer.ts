import {createFeatureSelector, createSelector, State} from '@ngrx/store';
import * as rider from './rider.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {IRider} from '../../models/rider.model';

export interface RiderState {
  riders: IRider[];
  inProgress: boolean;
  error: HttpErrorResponse;
}

const initalRiderState: RiderState = {
  riders: undefined,
  error: undefined,
  inProgress: false,
};

export function riderReducer(state = initalRiderState, action): RiderState {
  switch (action.type) {
    case rider.FETCH_RIDERS:
      return {
        ...state,
        inProgress: true,
      };
    case rider.FETCH_RIDERS_SUCCESS:
      return {
        ...state,
        riders: action.payload,
        inProgress: false,
        error: undefined
      };
    case rider.FETCH_RIDERS_FAILURE:
      return {
        ...state,
        riders: undefined,
        inProgress: false,
        error: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}

export const getRiderState = createFeatureSelector<RiderState>('riders');
export const getRiders = createSelector(getRiderState, (state: RiderState) => state.riders);
