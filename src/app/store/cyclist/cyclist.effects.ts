import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as cyclist from './cyclist.actions';
import {Observable} from 'rxjs/Observable';
import {CyclistService} from '../../services/cyclist.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class CyclistEffects {
  constructor(private actions$: Actions,
              private cyclistService: CyclistService) {
  }

  @Effect()
  fetchCyclist$ = this.actions$
    .ofType<cyclist.FetchCyclists>(cyclist.FETCH_CYCLISTS)
    .switchMap(action => {
      return this.cyclistService
        .getCyclists()
        .switchMap(cyclistResponse =>
          Observable.of(new cyclist.FetchCyclistsSuccess(cyclistResponse))
        )
        .catch(err => Observable.of(new cyclist.FetchCyclistsFailure(err)));
    });
}
