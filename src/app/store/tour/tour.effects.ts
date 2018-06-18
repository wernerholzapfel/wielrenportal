import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as tour from './tour.actions';
import * as etappe from '../etappe/etappe.actions';
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
  fetchTourById$ = this.actions$
    .ofType<tour.FetchTourById>(tour.FETCH_TOUR_BY_ID)
    .switchMap(action => {
      return this.tourService
        .getTourById(action.payload)
        .switchMap(tourResponse =>
          Observable.from([new tour.FetchTourSuccess(tourResponse), new etappe.FetchEtappeList(tourResponse.id)])
        )
        .catch(err => Observable.of(new tour.FetchTourFailure(err)));
    });

  @Effect()
  fetchTourList$ = this.actions$
    .ofType<tour.FetchTourList>(tour.FETCH_TOURLIST)
    .switchMap(action => {
      return this.tourService
        .getTourlist()
        .switchMap(tourResponse =>
          Observable.of(new tour.FetchTourListSuccess(tourResponse))
        )
        .catch(err => Observable.of(new tour.FetchTourListFailure(err)));
    });

  @Effect()
  updateTour$ = this.actions$
    .ofType<tour.SetCurrentRiderAsSelected>(tour.FETCH_TOUR)
    .switchMap(action => Observable.of(new tour.FetchTourSuccess(action.payload)))
    .catch(err => Observable.of(new tour.FetchTourFailure(err)));

@Effect()
  saveRiderToTeam$ = this.actions$
    .ofType<tour.SaveRiderToTeam>(tour.SAVE_RIDER_TO_TEAM)
    .switchMap(action => {
      return this.tourService.addRidertoTeam(action.payload);
    })
    .switchMap(action => Observable.of(new tour.SaveRiderToTeamSuccess(action)))
    .catch(err => Observable.of(new tour.SaveRiderToTeamFailure(err)));
}
