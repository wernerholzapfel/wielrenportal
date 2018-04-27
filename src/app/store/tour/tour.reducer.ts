import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as tour from './tour.actions';
import {ITour} from '../../models/tour.model';

export interface TourState {
  tour: ITour;
  inProgress: Boolean;
  error: any;
}

const initaltourState: TourState = {
  tour: undefined,
  error: undefined,
  inProgress: false,
};

export function tourReducer(state = initaltourState, action): TourState {
  switch (action.type) {
    case tour.FETCH_TOUR:
      return {
        ...state,
        inProgress: true,
      };
    case tour.FETCH_TOUR_SUCCESS:
      return {
        ...state,
        tour: action.payload,
        inProgress: false,
        error: undefined
      };
    case tour.FETCH_TOUR_FAILURE:
      return {
        ...state,
        tour: undefined,
        inProgress: false,
        error: action.payload,
      };
    case tour.Set_CURRENT_RIDER_AS_SELECTED:
      // const newTour: ITour =  state.tour.teams.forEach(team => {
      //     if (team.id === action.payload.teamId) {
      //       team.tourRiders.forEach(rider => {
      //         if (rider.rider.id === action.payload.riderId) {
      //           Object.assign(rider.rider, {selected: true});
      //         }
      //       });
      //     }
      //   });
      return {
        ...state,
        tour: action.payload,
        inProgress: false,
        error: undefined,
      };
    default:
      return {
        ...state
      };
  }
}


export const gettourState = createFeatureSelector<TourState>('tour');
export const gettour = createSelector(gettourState, (state: TourState) => state.tour);
