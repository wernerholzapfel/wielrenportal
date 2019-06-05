import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IParticipant} from '../../models/participant.model';
import * as participant from './participant.actions';

export interface ParticipantState {
  participant: IParticipant;
  inProgress: boolean;
  error: any;
}

const initialParticipantState: ParticipantState = {
  participant: null,
  inProgress: true,
  error: null
};

export function participantReducer(state = initialParticipantState, action): ParticipantState {
  switch (action.type) {
    case participant.FETCH_PARTICIPANT:
      return {
        ...state,
        inProgress: true,
      };
    case participant.FETCH_PARTICIPANT_SUCCESS:
      return {
        ...state,
        participant: action.payload,
        inProgress: false,
        error: undefined
      };
    case participant.FETCH_PARTICIPANT_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.payload
      };
    default:
      return {
        ...state
      };
  }
}


export const getParticipantState = createFeatureSelector<ParticipantState>('participant');
export const getParticipant = createSelector(getParticipantState, (state: ParticipantState) => state.participant);
