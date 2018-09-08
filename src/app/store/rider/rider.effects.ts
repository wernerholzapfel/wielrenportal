import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as rider from './rider.actions';
import {RiderService} from '../../services/rider.service';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';


@Injectable()
export class RiderEffects {
  constructor(private actions$: Actions,
              private riderService: RiderService) {
  }

  @Effect()
  fetchRider$ = this.actions$
    .ofType<rider.FetchRiders>(rider.FETCH_RIDERS)
    .pipe(switchMap(action => {
      return this.riderService
        .getRiders()
        .pipe(switchMap(riderResponse =>
            of(new rider.FetchRidersSuccess(riderResponse))),
          catchError(err => of(new rider.FetchRidersFailure(err))));
    }));
}
