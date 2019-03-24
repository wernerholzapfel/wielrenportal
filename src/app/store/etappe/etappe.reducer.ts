import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as etappe from './etappe.actions';
import {IEtappe} from '../../models/etappe.model';
import {ITeam} from '../../models/team.model';
import {getparticipanttableState, ParticipanttableState} from '../participanttable/participanttable.reducer';

export interface EtappeState {
  etappes: IEtappe[];
  latestEtappe: any[];
  inProgress: boolean;
  error: any;
}

const initaletappeState: EtappeState = {
  etappes: undefined,
  latestEtappe: [],
  error: undefined,
  inProgress: false,
};

export function etappeReducer(state = initaletappeState, action): EtappeState {
  switch (action.type) {
    case etappe.FETCH_ETAPPELIST:
    case etappe.FETCH_LATESTETAPPE:
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
      case etappe.FETCH_LATESTETAPPE_SUCCESS:
      return {
        ...state,
        latestEtappe: action.payload,
        inProgress: false,
        error: undefined
      };
    case etappe.FETCH_ETAPPELIST_FAILURE:
    case etappe.FETCH_LATESTETAPPE_FAILURE:
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
export const getDrivenEtappes = createSelector(getetappeState, (state: EtappeState) =>
  state.etappes ? state.etappes.filter(item => item.isDriven).sort((a, b) => b.etappeNumber - a.etappeNumber) : []);
export const getLatestEtappe = createSelector(getetappeState, (state: EtappeState) => state.latestEtappe);
export const getLatestEtappeTopX = (x) => createSelector(getetappeState, (state: EtappeState) => [...state.latestEtappe].slice(0, x));
export const getLatestEtappeParticipantScore = id => createSelector(getetappeState, (state: EtappeState) =>
    state.latestEtappe.find(item => item.id === id));
