import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as participanttable from './participanttable.actions';
import {IParticipanttable} from '../../models/participanttable.model';

export interface ParticipanttableState {
  participanttable: IParticipanttable[];
  lastUpdated: any;
  inProgress: boolean;
  error: any;
}

const initalparticipanttableState: ParticipanttableState = {
  participanttable: [{
    id: null,
    displayName: null,
    predictions: [],
    totalPoints: null,
  }],
  lastUpdated: null,
  error: undefined,
  inProgress: false,
};

export function participanttableReducer(state = initalparticipanttableState, action): ParticipanttableState {
  switch (action.type) {
    case participanttable.FETCH_PARTICIPANTTABLE:
      return {
        ...state,
        inProgress: true,
      };
    case participanttable.FETCH_PARTICIPANTTABLE_SUCCESS:
      return {
        ...state,
        participanttable: action.payload,
        inProgress: false,
        error: undefined
      };
    case participanttable.FETCH_PARTICIPANTTABLE_FAILURE:
      return {
        ...state,
        participanttable: undefined,
        inProgress: false,
        error: action.payload,
      }; case participanttable.FETCH_LASTUPDATED:
      return {
        ...state,
        inProgress: true,
      };
    case participanttable.FETCH_LASTUPDATED_SUCCESS:
      return {
        ...state,
        lastUpdated: action.payload,
          // .find(p => p.$key === 'lastUpdated') ? action.payload.find(p => p.$key === 'lastUpdated').$value : '',
        inProgress: false,
        error: undefined
      };
    case participanttable.FETCH_LASTUPDATED_FAILURE:
      return {
        ...state,
        lastUpdated: undefined,
        inProgress: false,
        error: action.payload,
      };
    default:
      return {
        ...state
      };
  }
}


export const getparticipanttableState = createFeatureSelector<ParticipanttableState>('participanttable');
export const getParticipanttable = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.participanttable);
export const getNumberOne = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.participanttable[0]);
export const getLastUpdated = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.lastUpdated);
export const getParticipantPredictions = id =>
  createSelector(getparticipanttableState, (state: ParticipanttableState) =>
    state.participanttable.find(item =>
      item.id === id));
