import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as tourrider from './tourrider.actions';
import {IRider} from '../../models/rider.model';

export interface TourriderState {
  tourriders: IRider[];
  inProgress: boolean;
  error: any;
}

const initaltourriderState: TourriderState = {
  tourriders: undefined,
  error: undefined,
  inProgress: false,
};

export function tourriderReducer(state = initaltourriderState, action): TourriderState {

  switch (action.type) {
    case tourrider.FETCH_TOURRIDERLIST:
      return {
        ...state,
        inProgress: true,
      };
    case tourrider.FETCH_TOURRIDERLIST_SUCCESS:
      return {
        ...state,
        tourriders: action.payload,
        inProgress: false,
        error: undefined
      };
    case tourrider.FETCH_TOURRIDERLIST_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}


export const gettourriderState = createFeatureSelector<TourriderState>('tourriders');
export const getTourriders = createSelector(gettourriderState, (state: TourriderState) => state.tourriders);
export const getWaterdragerTopX = (x, tourhasended: boolean) => createSelector(gettourriderState, (state: TourriderState) =>
  state && state.tourriders ?
    tourhasended ? state.tourriders.sort((a, b) => b.waterdragerTotalPoints - a.waterdragerTotalPoints).slice(0, x) :
      state.tourriders.sort((a, b) => b.waterdragerEtappePoints - a.waterdragerEtappePoints).slice(0, x)
    : []);
export const getRennerTopX = (x, tourhasended: boolean) => createSelector(gettourriderState, (state: TourriderState) =>
  state && state.tourriders ?
    state.tourriders.sort((a, b) => determineTotaalpunten(b, tourhasended) - determineTotaalpunten(a, tourhasended)
  ).slice(0, x) : []);


// todo duplicate code mogelijk uit calculatieservice halen, anders ook daaraanpassen
export function determineTotaalpunten(renner, tourhasEnded): number {
  if (tourhasEnded) {
    return ((renner.totalStagePoints ? renner.totalStagePoints : 0) +
      (renner.youthPoints ? renner.youthPoints : 0) +
      (renner.mountainPoints ? renner.mountainPoints : 0) +
      (renner.tourPoints ? renner.tourPoints : 0) +
      (renner.pointsPoints ? renner.pointsPoints : 0));
  } else {
    return renner.totalStagePoints ? renner.totalStagePoints : 0;
  }
}
