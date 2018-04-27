import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as tour from './tour.actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {TourService} from '../../services/tour.service';

@Injectable()
export class TourEffects {
  constructor(private actions$: Actions,
              private tourService: TourService) {
  }

  @Effect()
  fetchTour$ = this.actions$
    .ofType<tour.FetchTour>(tour.FETCH_TOUR)
    .switchMap(action => {
      return this.tourService
        .getTour()
        .switchMap(tourResponse =>
          Observable.of(new tour.FetchTourSuccess(tourResponse))
        )
        .catch(err => Observable.of(new tour.FetchTourFailure(err)));
    });

  @Effect()
  updateTour$ = this.actions$
    .ofType<tour.SetCurrentRiderAsSelected>(tour.FETCH_TOUR)
    .switchMap(action => Observable.of(new tour.FetchTourSuccess(action.payload)))
    .catch(err => Observable.of(new tour.FetchTourFailure(err)));
}
