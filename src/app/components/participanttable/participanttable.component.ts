import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {IRider} from '../../models/rider.model';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  data: any;
  participants: IParticipant[];
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Renner', valueGetter: this.determineRole},
    {headerName: 'Waarde', field: 'rider.waarde', sort: 'desc', width: 135},
    {headerName: 'Etappes', field: 'totalStagePoints', width: 135},
    {headerName: 'Tour', field: 'tourPoints', width: 135},
    {headerName: 'Berg', field: 'mountainPoints', width: 135},
    {headerName: 'Jongeren', field: 'youth', width: 135},
    // {headerName: 'Totaal', field: 'totalPoints'}
  ];
  rowSelection = 'single';

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  determineRole(params): string {
    if (params.data.isWaterdrager) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName + ' WD';
    }
    if (params.data.isLinkebal) {
      return params.data.rider.rider.firstName + params.data.rider.rider.surName + ' LB';
    }
    if (params.data.isBeschermdeRenner) {
      return params.data.rider.rider.firstName + params.data.rider.rider.surName + ' BR';
    }
    if (params.data.isMeesterknecht) {
      return params.data.rider.rider.firstName + params.data.rider.rider.surName + ' MK';
    } else {
      return params.data.rider.rider.firstName + params.data.rider.rider.surName;
    }
  }


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

  onRowSelected(event, participant) {
    if (event.node.selected) {
      this.participants.find(item => item.id === participant.id).selectedRider = event.data;
      // this.data = event.data;
      // this.openTourRidersDetailDialog(event.data);
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
