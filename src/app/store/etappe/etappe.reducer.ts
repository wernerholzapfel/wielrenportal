import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as etappe from './etappe.actions';
import {IEtappe} from '../../models/etappe.model';
import {ITeam} from '../../models/team.model';

export interface EtappeState {
  etappes: IEtappe[];
  inProgress: boolean;
  error: any;
}

const initaletappeState: EtappeState = {
  etappes: undefined,
  error: undefined,
  inProgress: false,
};

export function etappeReducer(state = initaletappeState, action): EtappeState {
  switch (action.type) {
    case etappe.FETCH_ETAPPELIST:
      return {
        ...state,
        inProgress: true,
      };
    case etappe.FETCH_ETAPPELIST_SUCCESS:
      return {
        ...state,
        etappes: action.payload,
        inProgress: false,
        error: undefined
      };
    case etappe.FETCH_ETAPPELIST_FAILURE:
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


export const getetappeState = createFeatureSelector<EtappeState>('etappe');
export const getEtappes = createSelector(getetappeState, (state: EtappeState) => state.etappes);
