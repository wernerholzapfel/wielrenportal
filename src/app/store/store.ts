import {ActionReducerMap} from '@ngrx/store';
import {cyclistReducer, CyclistState} from './cyclist/cyclist.reducer';
import {CyclistEffects} from './cyclist/cyclist.effects';

export interface IAppState {
  cyclists: CyclistState;
}

export const reducers: ActionReducerMap<IAppState> = {
  cyclists: cyclistReducer
};

export const effects = [CyclistEffects];
