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

export interface IAppState {
  riders: RiderState;
  tour: TourState;
  etappe: EtappeState;
  team: TeamState;
  participanttable: ParticipanttableState;
}

export const reducers: ActionReducerMap<IAppState> = {
  riders: riderReducer,
  tour: tourReducer,
  etappe: etappeReducer,
  team: teamReducer,
  participanttable: participanttableReducer,
};

export const effects = [RiderEffects, TourEffects, EtappeEffects, TeamEffects, ParticipanttableEffects];
