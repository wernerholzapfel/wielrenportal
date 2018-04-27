import {ActionReducerMap} from '@ngrx/store';
import {riderReducer, RiderState} from './rider/rider.reducer';
import {RiderEffects} from './rider/rider.effects';
import {tourReducer, TourState} from './tour/tour.reducer';
import {TourEffects} from './tour/tour.effects';

export interface IAppState {
  riders: RiderState;
  tour: TourState;
}

export const reducers: ActionReducerMap<IAppState> = {
  riders: riderReducer,
  tour: tourReducer,
};

export const effects = [RiderEffects, TourEffects];
