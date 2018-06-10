import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as tour from './tour.actions';
import {ITour} from '../../models/tour.model';
import {ITeam} from '../../models/team.model';
import {ITourriders} from '../../models/tourriders.model';

export interface TourState {
  tours: ITour[];
  tour: ITour;
  inProgress: Boolean;
  error: any;
}

const initaltourState: TourState = {
  tours: undefined,
  tour: {
    teams: [],
    id: undefined, endDate: null, startDate: null, tourName: '', isActive: undefined
  },
  error: undefined,
  inProgress: false,
};

export function tourReducer(state = initaltourState, action): TourState {
  switch (action.type) {
    case tour.FETCH_TOURLIST:
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
    case tour.FETCH_TOURLIST_SUCCESS:
      return {
        ...state,
        tours: action.payload,
        inProgress: false,
        error: undefined
      };
    case tour.FETCH_TOURLIST_FAILURE:
    case tour.FETCH_TOUR_FAILURE:
      return {
        ...state,
        tour: undefined,
        inProgress: false,
        error: action.payload,
      };
    case tour.Set_CURRENT_RIDER_AS_SELECTED:
      return {
        ...state,
        tour: {
          tourName: state.tour.tourName,
          id: state.tour.id,
          isActive: state.tour.isActive,
          startDate: state.tour.startDate,
          endDate: state.tour.endDate,
          teams: state.tour.teams.map(team => (team.id === action.payload.team.id ? {
            id: team.id,
            teamName: team.teamName,
            teamAbbreviation: team.teamAbbreviation,
            selected: team.selected,
            teamNameShort: team.teamNameShort,
            country: team.country,
            tourRiders: team.tourRiders.map(rider => (rider.id === action.payload.rider.id ?
              Object.assign(rider, {isSelected: action.payload.selected}) : rider)
            )
          } : team)),
        },
        inProgress: false,
        error: undefined,
      };
    case tour.SAVE_RIDER_TO_TEAM_SUCCESS:
      return {
        ...state,
        tour: {
          tourName: state.tour.tourName,
          id: state.tour.id,
          isActive: state.tour.isActive,
          startDate: state.tour.startDate,
          endDate: state.tour.endDate,
          teams: state.tour.teams.map(
            team => (team.id === action.payload.team.id ? {
              id: team.id,
              teamName: team.teamName,
              teamAbbreviation: team.teamAbbreviation,
              selected: team.selected,
              teamNameShort: team.teamNameShort,
              country: team.country,
              tourRiders: [...team.tourRiders, action.payload]
            } : team)),
        }
      };
    default:
      return {
        ...state
      };
  }
}


export const gettourState = createFeatureSelector<TourState>('tour');
export const getTour = createSelector(gettourState, (state: TourState) => state.tour);
export const getTourTeams = createSelector(gettourState, (state: TourState) => state.tour ? state.tour.teams : []);
export const getTourRiders = createSelector(getTourTeams, (tourTeams: ITeam[]) => {
  let flattenTourRiders: ITourriders[] = [];
  tourTeams.map(tourteam => {
    flattenTourRiders = [...flattenTourRiders, ...tourteam.tourRiders];
  });
  return flattenTourRiders;
});

export const getTours = createSelector(gettourState, (state: TourState) => state.tours);
