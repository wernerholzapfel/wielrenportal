import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../login/login.component';
import {EtappeService} from '../../services/etappe.service';
import {IEtappe} from '../../models/etappe.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import * as fromTour from '../../store/tour/tour.actions';
import {TourService} from '../../services/tour.service';
import {getEtappes} from '../../store/etappe/etappe.reducer';

@Component({
  selector: 'app-edittourriderdialog',
  templateUrl: './edittourriderdialog.component.html',
  styleUrls: ['./edittourriderdialog.component.scss']
})
export class EdittourriderdialogComponent implements OnInit {

  constructor(private store: Store<IAppState>, private etappeService: EtappeService, private tourriderservice: TourService, public dialogRef: MatDialogRef<EdittourriderdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  etappes: IEtappe[];
  selectedEtappe: IEtappe;

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
    this.store.select(getEtappes).subscribe(response => this.etappes = response.sort((a, b) => a.etappeNumber - b.etappeNumber));
    this.selectedEtappe = this.data.latestEtappe;
  }

  saveRiderToTeam(data: any) {
    this.tourriderservice.addRidertoTeam({
      id: data.id,
      isOut: data.isOut,
      waarde: data.waarde,
      tour: data.tour,
      team: data.team,
      rider: data.rider,
      latestEtappe: this.selectedEtappe
    }).subscribe(response => {
     console.log('saveriderToTeam response: ' + response);
    });
  }

}
