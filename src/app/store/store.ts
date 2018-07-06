import {ActionReducerMap} from '@ngrx/store';
import {riderReducer, RiderState} from './rider/rider.reducer';
import {RiderEffects} from './rider/rider.effects';
import {tourReducer, TourState} from './tour/tour.reducer';
import {TourEffects} from './tour/tour.effects';
import {TeamEffects} from './team/team.effects';
import {teamReducer, TeamState} from './team/team.reducer';
import {participanttableReducer, ParticipanttableState} from './participanttable/participanttable.reducer';
import {ParticipanttableEffects} from './participanttable/participanttable.effects';
import {etappeReducer, EtappeState} from './etappe/etappe.reducer';
import {EtappeEffects} from './etappe/etappe.effects';
import {participantformReducer, ParticipantformState} from './participantform/participantform.reducer';
import {ParticipantformEffects} from './participantform/participantform.effects';

export interface IAppState {
  riders: RiderState;
  tour: TourState;
  etappe: EtappeState;
  team: TeamState;
  participanttable: ParticipanttableState;
  participantform: ParticipantformState;
}

export const reducers: ActionReducerMap<IAppState> = {
  riders: riderReducer,
  tour: tourReducer,
  etappe: etappeReducer,
  team: teamReducer,
  participanttable: participanttableReducer,
  participantform: participantformReducer
};

export const effects = [RiderEffects, TourEffects, EtappeEffects, TeamEffects, ParticipanttableEffects, ParticipantformEffects];
