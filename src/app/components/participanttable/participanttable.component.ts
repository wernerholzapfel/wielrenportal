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
  private gridApi;
  private gridColumnApi;

  data: any;
  participants: IParticipant[];
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Renner', valueGetter: this.determineRole, minWidth: 200},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 80},
    {headerName: 'Totaalpunten', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 80},
    {headerName: 'Etappes', field: 'totalStagePoints', minWidth: 80},
    {headerName: 'Laatste etappe', field: 'deltaStagePoints', minWidth: 80},
    {headerName: 'Tour', field: 'tourPoints', minWidth: 80},
    {headerName: 'Berg', field: 'mountainPoints', minWidth: 80},
    {headerName: 'Jongeren', field: 'youthPoints', minWidth: 80},
    {headerName: 'Punten', field: 'pointsPoints', minWidth: 80},
    {headerName: 'Waarde', field: 'rider.waarde', minWidth: 80},
    // {headerName: 'Totaal', field: 'totalPoints'}
  ];
  rowSelection = 'single';

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }


  determineIsOutText(params): string {
    return (params.data.rider && params.data.rider.isOut) ? 'Ja' : 'Nee';
  }

  determineRole(params): string {
    if (params.data.isWaterdrager) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName + ' WD';
    }
    if (params.data.isLinkebal) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName + ' LB';
    }
    if (params.data.isBeschermdeRenner) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName + ' BR';
    }
    if (params.data.isMeesterknecht) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName + ' MK';
    } else {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName;
    }
  }

  determineTotaalpunten(params): number {
    if ('todo tourisDone' === 'todo tourisDone') {
      return ((params.data.totalStagePoints ? params.data.totalStagePoints : 0) +
        (params.data.youthPoints ? params.data.youthPoints : 0) +
        (params.data.mountainPoints ? params.data.mountainPoints : 0) +
        (params.data.tourPoints ? params.data.tourPoints : 0) +
        (params.data.pointsPoints ? params.data.pointsPoints : 0));
    } else {
      return params.data.totalStagePoints ? params.data.totalStagePoints : 0;

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
      // this.participants.find(item => item.id === participant.id).selectedRider = event.data;
      this.data = event.data;
      this.openTourRidersDetailDialog(event.data);
    }
  }

  openTourRidersDetailDialog(data: any) {
    const dialogRef = this.dialog.open(TourriderdetaildialogComponent, {
      data: data,
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed')
      this.gridOptions.api.deselectAll();
    });
  }
}
