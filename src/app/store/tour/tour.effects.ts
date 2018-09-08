import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as tour from './tour.actions';


import {TourService} from '../../services/tour.service';
import {of} from 'rxjs/internal/observable/of';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class TourEffects {
  constructor(private actions$: Actions,
              private tourService: TourService) {
  }

  @Effect()
  fetchTour$ = this.actions$
    .ofType<tour.FetchTour>(tour.FETCH_TOUR)
    .pipe(switchMap(action => {
      return this.tourService
        .getTour()
        .pipe(switchMap(tourResponse =>
            of(new tour.FetchTourSuccess(tourResponse))),
          catchError(err => of(new tour.FetchTourFailure(err))));
    }));

  @Effect()
  fetchTourById$ = this.actions$
    .ofType<tour.FetchTourById>(tour.FETCH_TOUR_BY_ID)
    .pipe(switchMap(action => {
      return this.tourService
        .getTourById(action.payload)
        .pipe(switchMap(tourResponse =>
            of(new tour.FetchTourSuccess(tourResponse))),
          catchError(err => of(new tour.FetchTourFailure(err))));
    }));


  @Effect()
  fetchTourList$ = this.actions$
    .ofType<tour.FetchTourList>(tour.FETCH_TOURLIST)
    .pipe(switchMap(action => {
      return this.tourService
        .getTourlist()
        .pipe(switchMap(tourResponse =>
            of(new tour.FetchTourListSuccess(tourResponse))
          ),
          catchError(err => of(new tour.FetchTourListFailure(err))));
    }));

  // @Effect()
  // updateTour$ = this.actions$
  //   .ofType<tour.SetCurrentRiderAsSelected>(tour.FETCH_TOUR)
  //   .switchMap(action => Observable.of(new tour.FetchTourSuccess(action.payload)))
  //   .catch(err => Observable.of(new tour.FetchTourFailure(err)));

  @Effect()
  saveRiderToTeam$ = this.actions$
    .ofType<tour.SaveRiderToTeam>(tour.SAVE_RIDER_TO_TEAM)
    .pipe(
      switchMap(action => {
        return this.tourService.addRidertoTeam(action.payload);
      }))
    .pipe(
      switchMap(action => of(new tour.SaveRiderToTeamSuccess(action))),
      catchError(err => of(new tour.SaveRiderToTeamFailure(err))));
}
