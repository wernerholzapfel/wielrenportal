import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as tour from './tour.actions';
import * as etappe from '../etappe/etappe.actions';

import {TourService} from '../../services/tour.service';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class TourEffects {
  constructor(private actions$: Actions,
              private tourService: TourService) {
  }

  @Effect()
  fetchTour$ = this.actions$
    .pipe(
      ofType<tour.FetchTour>(tour.FETCH_TOUR),
      switchMap(action => {
        return this.tourService
          .getTour()
          .pipe(switchMap(tourResponse =>
              of(new tour.FetchTourSuccess(tourResponse))),
            catchError(err => of(new tour.FetchTourFailure(err))));
      }));

  @Effect()
  fetchTourById$ = this.actions$
    .pipe(ofType<tour.FetchTourById>(tour.FETCH_TOUR_BY_ID),
      switchMap(action => {
        return this.tourService
          .getTourById(action.payload)
          .pipe(switchMap(tourResponse =>
              of(new tour.FetchTourSuccess(tourResponse))),
            catchError(err => of(new tour.FetchTourFailure(err))));
      }));

  @Effect()
  fetchTourSuccess$ = this.actions$
    .pipe(ofType<tour.FetchTourSuccess>(tour.FETCH_TOUR_SUCCESS),
      switchMap(action =>
        of(new etappe.FetchEtappeList(action.payload.id))),
      catchError(err => of(new tour.FetchTourFailure(err))));


  @Effect()
  fetchTourList$ = this.actions$
    .pipe(
      ofType<tour.FetchTourList>(tour.FETCH_TOURLIST),
      switchMap(action => {
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
    .pipe(ofType<tour.SaveRiderToTeam>(tour.SAVE_RIDER_TO_TEAM),
      switchMap(action => {
        return this.tourService.addRidertoTeam(action.payload);
      }))
    .pipe(
      switchMap(action => of(new tour.SaveRiderToTeamSuccess(action))),
      catchError(err => of(new tour.SaveRiderToTeamFailure(err))));
}
