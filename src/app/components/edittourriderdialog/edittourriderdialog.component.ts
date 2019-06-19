import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../login/login.component';
import {EtappeService} from '../../services/etappe.service';
import {IEtappe} from '../../models/etappe.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {TourService} from '../../services/tour.service';
import {getEtappes} from '../../store/etappe/etappe.reducer';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as fromTour from '../../store/tour/tour.actions';
import {getRiders} from '../../store/rider/rider.reducer';
import {IRider} from '../../models/rider.model';

@Component({
  selector: 'app-edittourriderdialog',
  templateUrl: './edittourriderdialog.component.html',
  styleUrls: ['./edittourriderdialog.component.scss']
})
export class EdittourriderdialogComponent implements OnInit, OnDestroy {

  constructor(private store: Store<IAppState>,
              private etappeService: EtappeService,
              private tourriderservice: TourService,
              public dialogRef: MatDialogRef<EdittourriderdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ridersList$: Observable<IRider[]>;
  etappes: IEtappe[];
  selectedEtappe: IEtappe;
  unsubscribe = new Subject<void>();

  riderForm = new FormGroup({
    riderWaardeFormControl: new FormControl('', [
      Validators.required,
    ]),
    isUitgevallenFormControl: new FormControl('', []),
    etappeFormControl: new FormControl('', []),

  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    // todo store in store
    // todo get tour?
    this.store.select(getEtappes).pipe(takeUntil(this.unsubscribe))
      .subscribe(response => this.etappes = response.sort((a, b) => a.etappeNumber - b.etappeNumber));
    this.selectedEtappe = this.data.latestEtappe;

    this.ridersList$ = this.store.select(getRiders);
  }

  updateTourRider(data: any) {
    this.store.dispatch(new fromTour.UpdateRiderFromTeam({
      id: data.id,
      isOut: data.isOut,
      waarde: data.waarde,
      tour: data.tour,
      team: data.team,
      rider: data.rider,
      latestEtappe: this.selectedEtappe
    }));
  }

  deleteRiderFromTourridersTeam(tourridersId: string) {
    this.store.dispatch(new fromTour.DeleteRiderFromTeam(tourridersId));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
