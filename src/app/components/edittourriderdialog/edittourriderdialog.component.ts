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
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
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
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // see https://stackblitz.com/edit/mat-select-search for working of mat-select-search

  ridersList: IRider[];
  filteredRidersList$: BehaviorSubject<IRider[]> = new BehaviorSubject([]);

  etappes: IEtappe[];
  selectedEtappe: IEtappe;

  riderForm = new FormGroup({
    riderWaardeFormControl: new FormControl('', [
      Validators.required,
    ]),
    isUitgevallenFormControl: new FormControl('', []),
    etappeFormControl: new FormControl('', []),
  });

  rennerFilterCtrl: FormControl = new FormControl();
  unsubscribe = new Subject<void>();

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.store.select(getEtappes).pipe(takeUntil(this.unsubscribe))
      .subscribe(response => this.etappes = response.sort((a, b) => a.etappeNumber - b.etappeNumber));
    this.selectedEtappe = this.data.latestEtappe;

    this.store.select(getRiders).pipe(takeUntil(this.unsubscribe))
      .subscribe(riders => {
        this.ridersList = riders.sort((a, b) => {
          if (a.surName < b.surName) {
            return -1;
          }
          if (a.surName > b.surName) {
            return 1;
          }
          return 0;
        });
        this.filteredRidersList$.next(this.ridersList.slice());
      });


    // listen for search field value changes
    this.rennerFilterCtrl.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.filterRiders();
      });
  }

  private filterRiders() {
    if (!this.ridersList) {
      return;
    }
    const search = this.rennerFilterCtrl.value;
    if (!search) {
      this.filteredRidersList$.next(this.ridersList.slice());
      return;
    }
    this.filteredRidersList$.next(
      this.ridersList.filter(rider => rider.surName.toLowerCase().indexOf(search.toLowerCase()) > -1)
    );
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
