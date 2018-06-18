import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as etappe from './etappe.actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {EtappeService} from '../../services/etappe.service';

@Injectable()
export class EtappeEffects {
  constructor(private actions$: Actions,
              private etappeService: EtappeService) {
  }

  @Effect()
  fetchEtappeList$ = this.actions$
    .ofType<etappe.FetchEtappeList>(etappe.FETCH_ETAPPELIST)
    .switchMap(action => {
      return this.etappeService
        .getEtappes(action.payload)
        .switchMap(etappeResponse =>
          Observable.of(new etappe.FetchEtappeListSuccess(etappeResponse))
        )
        .catch(err => Observable.of(new etappe.FetchEtappeListFailure(err)));
    });
}
