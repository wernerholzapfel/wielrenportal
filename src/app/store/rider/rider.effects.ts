import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as rider from './rider.actions';
import {Observable} from 'rxjs/Observable';
import {RiderService} from '../../services/rider.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class RiderEffects {
  constructor(private actions$: Actions,
              private riderService: RiderService) {
  }

  @Effect()
  fetchRider$ = this.actions$
    .ofType<rider.FetchRiders>(rider.FETCH_RIDERS)
    .switchMap(action => {
      return this.riderService
        .getRiders()
        .switchMap(riderResponse =>
          Observable.of(new rider.FetchRidersSuccess(riderResponse))
        )
        .catch(err => Observable.of(new rider.FetchRidersFailure(err)));
    });
}
