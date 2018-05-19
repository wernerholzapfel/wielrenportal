import {Component, Input, OnInit} from '@angular/core';
import {EtappeService} from '../../services/etappe.service';
import {IEtappe} from '../../models/etappe.model';
import {MatDialog} from '@angular/material';
import {AddEtappeDialogComponent} from './dialog/add-etappe-dialog/add-etappe-dialog.component';
import {ITour} from '../../models/tour.model';
import {AddStageClassificationsComponent} from './dialog/add-stage-classifications/add-stage-classifications.component';
import {ETAPPECLASSIFICATION} from '../../models/constants';

@Component({
  selector: 'app-etappes',
  templateUrl: './etappes.component.html',
  styleUrls: ['./etappes.component.scss']
})
export class EtappesComponent implements OnInit {

  etappes: IEtappe[];
  @Input() selectedtour: ITour;

  constructor(private etappeService: EtappeService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.etappeService.getEtappes().subscribe(response => this.etappes = response);

  }

  openAddEtappeDialog() {
    const dialogRef = this.dialog.open(AddEtappeDialogComponent, {
      data: {tour: this.selectedtour},
      width: '400px'
    });

    // todo move to store ?
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.etappeService.saveEtappe(result).subscribe(response => {
          this.etappes = [...this.etappes, response];
        });
      }
    });
  }

  openAddStageClassificationsDialog(etappe) {
    const dialogRef = this.dialog.open(AddStageClassificationsComponent, {
      data: {
        type: ETAPPECLASSIFICATION,
        form: {
          etappe: etappe,
          uitslag: [],
          tour: this.selectedtour
        }
      },
      width: '90%',
      height: '90%'
    });

    // todo move to store ?
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
}


