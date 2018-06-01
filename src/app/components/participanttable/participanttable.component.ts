import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {Router} from '@angular/router';

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
    {headerName: 'Renner', cellRenderer: this.determineRole, minWidth: 200},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 80},
    {headerName: 'Totaalpunten', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 80},
    {headerName: 'Etappes', valueGetter: this.formatEtappeTotaalpunten, minWidth: 100},
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
    // todo implement with mat-icon and mat-tooltip https://plnkr.co/edit/?p=preview
    if (params.data.isWaterdrager) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName +
        '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">delete_outline</mat-icon>';
    }
    if (params.data.isLinkebal) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName +
        '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">new_releases</mat-icon>';
    }
    if (params.data.isBeschermdeRenner) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName +
        '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">verified_user</mat-icon>';
    }
    if (params.data.isMeesterknecht) {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName +
        '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">build</mat-icon>';
    } else {
      return params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName;
    }
  }

  formatEtappeTotaalpunten(params): string {
    const addendum: string = (params.data.deltaStagePoints > 0) ? ' (+' + params.data.deltaStagePoints + ')' : (params.data.deltaStagePoints === 0) ? '' : ' (' + params.data.deltaStagePoints + ')';
    return params.data.totalStagePoints + addendum;
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


  constructor(private participantService: ParticipantService, public dialog: MatDialog, private router: Router) {
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
