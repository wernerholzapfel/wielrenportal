import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as tourrider from './tourrider.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {RiderService} from '../../services/rider.service';

@Injectable()
export class TourriderEffects {
  constructor(private actions$: Actions,
              private riderService: RiderService) {
  }

  @Effect()
  fetchTourriderList$ = this.actions$
    .pipe(ofType<tourrider.FetchTourriderList>(tourrider.FETCH_TOURRIDERLIST),
      switchMap(action => {
      return this.riderService.getDetailTourriders(action.payload)
        .pipe(switchMap(tourriderResponse =>
            of(new tourrider.FetchTourriderListSuccess(tourriderResponse))),
          catchError(err => of(new tourrider.FetchTourriderListFailure(err))));
    }));
}
