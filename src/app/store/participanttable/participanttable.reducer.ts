import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as participanttable from './participanttable.actions';
import {IParticipanttable} from '../../models/participanttable.model';

export interface ParticipanttableState {
  participanttable: IParticipanttable[];
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
      };
    default:
      return {
        ...state
      };
  }
}


export const getparticipanttableState = createFeatureSelector<ParticipanttableState>('participanttable');
export const getParticipanttable = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.participanttable);
export const getParticipantPredictions = id =>
  createSelector(getparticipanttableState, (state: ParticipanttableState) =>
    state.participanttable.find(item =>
      item.id === id));
