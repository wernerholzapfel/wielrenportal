import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as etappe from './etappe.actions';
import {EtappeService} from '../../services/etappe.service';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class EtappeEffects {
  constructor(private actions$: Actions,
              private etappeService: EtappeService) {
  }

  @Effect()
  fetchEtappeList$ = this.actions$
    .pipe(ofType<etappe.FetchEtappeList>(etappe.FETCH_ETAPPELIST),
      switchMap(action => {
      return this.etappeService
        .getEtappes(action.payload)
        .pipe(switchMap(etappeResponse =>
            of(new etappe.FetchEtappeListSuccess(etappeResponse))),
          catchError(err => of(new etappe.FetchEtappeListFailure(err))));
    }));
}
