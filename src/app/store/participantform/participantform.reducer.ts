import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as participantform from './participantform.actions';

export interface ParticipantformState {
  inProgress: boolean;
  rider: any[];
  error: any;
}

const initalparticipantformState: ParticipantformState = {
  inProgress: false,
  rider: [],
  error: undefined
};

export function participantformReducer(state = initalparticipantformState, action): ParticipantformState {
  switch (action.type) {
    case participantform.FETCH_PARTICIPANTFORM:
      return {
        ...state,
        inProgress: true,
      };
    case participantform.FETCH_PARTICIPANTFORM_SUCCESS:
      return {
        ...state,
        rider: action.payload,
        inProgress: false,
        error: undefined
      };
    case participantform.FETCH_PARTICIPANTFORM_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    case participantform.ADD_RIDER_TO_FORM:
      return {
        ...state,
        rider: [...state.rider, action.payload],
      };
    case participantform.DELETE_RIDER_FROM_FORM:
      return {
        ...state,
        rider: state.rider.filter(rider => rider.rider.id !== action.payload.rider.id),
      };
    default:
      return {
        ...state
      };
  }
}


export const getparticipantformState = createFeatureSelector<ParticipantformState>('participantform');
export const getParticipantforms = createSelector(getparticipantformState, (state: ParticipantformState) => state.rider);
