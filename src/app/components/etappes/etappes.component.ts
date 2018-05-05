import {Component, Input, OnInit} from '@angular/core';
import {EtappeService} from '../../services/etappe.service';
import {IEtappe} from '../../models/etappe.model';
import {MatDialog} from '@angular/material';
import {AddEtappeDialogComponent} from './dialog/add-etappe-dialog/add-etappe-dialog.component';
import {ITour} from '../../models/tour.model';

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

  openDialog() {
    const dialogRef = this.dialog.open(AddEtappeDialogComponent, {
      data: {tour: this.selectedtour},
      width: '400px'
    });

    // todo move to store ?
    dialogRef.afterClosed().subscribe(result => {
      this.etappeService.saveEtappe(result).subscribe(response => {
        this.etappes = [...this.etappes, response];
      });
    });
  }
}


