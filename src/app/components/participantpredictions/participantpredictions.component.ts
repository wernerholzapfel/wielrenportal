import {Component, Input, OnInit} from '@angular/core';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {getParticipantPredictions} from '../../store/participanttable/participanttable.reducer';
import {Observable} from 'rxjs/Observable';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ParticipantService} from '../../services/participant.service';

@Component({
  selector: 'app-participantpredictions',
  templateUrl: './participantpredictions.component.html',
  styleUrls: ['./participantpredictions.component.scss']
})
export class ParticipantpredictionsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  sub: Subscription;
  participanttable$: Observable<any>;
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '', cellRenderer: this.determineFlag, width: 50},
    {headerName: 'Renner', cellRenderer: this.determineRole, width: 210},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, width: 80},
    {headerName: 'Etappes', valueGetter: this.formatEtappeTotaalpunten, width: 100},
    {headerName: 'Algemeen', field: 'tourPoints', width: 100},
    {headerName: 'Berg', field: 'mountainPoints', width: 80},
    {headerName: 'Punten', field: 'pointsPoints', width: 85},
    {headerName: 'Jongeren', field: 'youthPoints', width: 100},
    {headerName: 'Totaalpunten', sort: 'desc', valueGetter: this.determineTotaalpunten, width: 140},
    {headerName: 'Waarde', field: 'rider.waarde', width: 90},
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

  determineFlag(params): string {
    const url = '/assets/images/flag/' + params.data.rider.rider.nationality + '.png';
    return '<img class="ag-grid-icon" style="height: 18px;" src=' + url + '>';
  }

  determineRole(params): string {
    // todo implement with mat-icon and mat-tooltip https://plnkr.co/edit/?p=preview
    if (params.data.isWaterdrager) {
      return '<div><mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">delete_outline</mat-icon>' +
        params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName + '</div>';
    }
    if (params.data.isLinkebal) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">new_releases</mat-icon>' +
        params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName;
    }
    if (params.data.isBeschermdeRenner) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">verified_user</mat-icon>' +
        params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName;
    }
    if (params.data.isMeesterknecht) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">build</mat-icon>' +
        params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName;
    } else {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">directions_bike</mat-icon>'
        + params.data.rider.rider.firstName + ' ' + params.data.rider.rider.surName;
    }
  }

  formatEtappeTotaalpunten(params): string {
    const addendum: string =
      (params.data.deltaStagePoints > 0) ? ' (+' + params.data.deltaStagePoints + ')' :
        (params.data.deltaStagePoints === 0) ? '' : ' (' + params.data.deltaStagePoints + ')';
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

  constructor(private store: Store<IAppState>,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private participantService: ParticipantService) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.participanttable$ = this.store.select(getParticipantPredictions(params['id']));
      } else {
        this.participantService.getParticipant().subscribe(user => {
          console.log(user);
          this.participanttable$ = this.store.select(getParticipantPredictions(user.id));
        });
      }
    });


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
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
      this.gridOptions.api.deselectAll();
    });
  }
}
