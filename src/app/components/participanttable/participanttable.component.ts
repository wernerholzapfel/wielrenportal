import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit {

  participants: IParticipant[];
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Renner', field: 'rider.rider.surName'},
    {headerName: 'Waarde', field: 'rider.waarde', sort: 'desc'},
    {headerName: 'Nationaliteit', field: 'rider.rider.nationality'},
    {headerName: 'Punten', field: 'punten'}
  ];
  rowSelection = 'single';

  constructor(private participantService: ParticipantService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.participantService.getParticipantsTable().subscribe(response => this.participants = response);

    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.openTourRidersDetailDialog(event.data);
    }
  }

  openTourRidersDetailDialog(data: any) {
    const dialogRef = this.dialog.open(TourriderdetaildialogComponent, {
      data: data,
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

}
