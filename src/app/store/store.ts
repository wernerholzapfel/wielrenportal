import {ActionReducerMap} from '@ngrx/store';
import {riderReducer, RiderState} from './rider/rider.reducer';
import {RiderEffects} from './rider/rider.effects';
import {tourReducer, TourState} from './tour/tour.reducer';
import {TourEffects} from './tour/tour.effects';
import {TeamEffects} from './team/team.effects';
import {teamReducer, TeamState} from './team/team.reducer';
import {participanttableReducer, ParticipanttableState} from './participanttable/participanttable.reducer';
import {ParticipanttableEffects} from './participanttable/participanttable.effects';

export interface IAppState {
  riders: RiderState;
  tour: TourState;
  team: TeamState;
  participanttable: ParticipanttableState;
}

export const reducers: ActionReducerMap<IAppState> = {
  riders: riderReducer,
  tour: tourReducer,
  team: teamReducer,
  participanttable: participanttableReducer,
};

export const effects = [RiderEffects, TourEffects, TeamEffects, ParticipanttableEffects];
