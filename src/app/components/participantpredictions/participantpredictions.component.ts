import {Component, OnInit} from '@angular/core';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import {getParticipantPredictions} from '../../store/participanttable/participanttable.reducer';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ParticipantService} from '../../services/participant.service';
import {ITour} from '../../models/tour.model';
import {getTour} from '../../store/tour/tour.reducer';
import {HastourendedclassComponent} from '../../aggridcomponents/hastourendedclass/hastourendedclass.component';

@Component({
  selector: 'app-participantpredictions',
  templateUrl: './participantpredictions.component.html',
  styleUrls: ['./participantpredictions.component.scss']
})
export class ParticipantpredictionsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  sub: Subscription;
  participanttable: any;
  tour: ITour;
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '', cellRenderer: this.determineFlag, minWidth: 50, maxWidth: 50},
    {headerName: 'Renner', cellRenderer: this.determineRole, minWidth: 210, maxWidth: 210},
    {headerName: 'Tot. pt', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 100, maxWidth: 100},
    {headerName: 'Etappes', valueGetter: this.formatEtappeTotaalpunten, minWidth: 100, maxWidth: 100},
    {
      headerName: 'Truien',
      valueGetter: this.determineTruienPoints,
      cellRenderer: 'hasTourEndedClass',
      minWidth: 100,
      maxWidth: 100
    },
    {
      headerName: 'Algemeen', field: 'tourPoints', cellRenderer: 'hasTourEndedClass',
      minWidth: 100, maxWidth: 100
    },
    {headerName: 'Berg', field: 'mountainPoints', cellRenderer: 'hasTourEndedClass', minWidth: 80, maxWidth: 80},
    {headerName: 'Punten', field: 'pointsPoints', cellRenderer: 'hasTourEndedClass', minWidth: 85, maxWidth: 85},
    {headerName: 'Jongeren', field: 'youthPoints', cellRenderer: 'hasTourEndedClass', minWidth: 100, maxWidth: 100},
    {headerName: 'Waarde', field: 'rider.waarde', minWidth: 90, maxWidth: 90},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 80, maxWidth: 80},
    {headerName: '# gekozen', valueGetter: this.determineChoosenCount, minWidth: 110, maxWidth: 110},
    // {headerName: 'Totaal', field: 'totalPoints'}
  ];
  rowSelection = 'single';
  frameworkComponents = {
    hasTourEndedClass: HastourendedclassComponent,
  };

  determineIsOutText(params): string {
    return (params.data.rider && params.data.rider.isOut) ? 'Ja' : 'Nee';
  }

  determineFlag(params): string {
    const url = '/assets/images/flag/' + params.data.rider.rider.nationality + '.png';
    return '<img class="ag-grid-icon" style="height: 18px;" src=' + url + '>';
  }

  determineChoosenCount(params): number {
    if (params.data.isRider) {
      return params.data.rider.predictions.filter(p => p.isRider).length;
    } else {
      return null;
    }
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

  determineTruienPoints(params): number {
    const tourPoints = params.data.tourPoints ? params.data.tourPoints : 0;
    const mountainPoints = params.data.mountainPoints ? params.data.mountainPoints : 0;
    const pointsPoints = params.data.pointsPoints ? params.data.pointsPoints : 0;
    const youthPoints = params.data.youthPoints ? params.data.youthPoints : 0;
    return tourPoints + mountainPoints + pointsPoints + youthPoints;
  }

  constructor(private store: Store<IAppState>,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private participantService: ParticipantService) {
  }

  ngOnInit() {

    // this.sub = this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.participanttable$ = this.store.select(getParticipantPredictions(params['id']));
    //   } else {
    //     this.participantService.getParticipant().subscribe(user => {
    //       console.log(user);
    //       this.participanttable$ = this.store.select(getParticipantPredictions(user.id));
    //     });
    //   }
    // });


    this.gridOptions = <GridOptions>{
      context: {parentComponent: this},
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.store.select(getTour).subscribe(tour => {
      this.tour = tour;
      // todo refactor for example  subscribe until
      this.sub = this.route.params.subscribe(routeParams => {
        if (routeParams['id']) {
          this.store.select(getParticipantPredictions(routeParams['id'])).subscribe(participanttable => {
            if (participanttable) {
              this.participanttable = participanttable;
              this.gridApi.setRowData(participanttable.predictions);
            }
          });
        } else {
          this.participantService.getParticipant().subscribe(user => {
            console.log(user);
            this.store.select(getParticipantPredictions(user.id)).subscribe(participanttable => {
              if (participanttable) {
                this.participanttable = participanttable;
                this.gridApi.setRowData(participanttable.predictions);
              }
            });
          });
        }
      });
    });
    params.api.sizeColumnsToFit();
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.openTourRidersDetailDialog(event.data);
    }
  }

  openTourRidersDetailDialog(data: any) {
    const dialogRef = this.dialog.open(TourriderdetaildialogComponent, {
      data: data.rider,
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
      this.gridOptions.api.deselectAll();
    });
  }

  determineTotaalpunten(params): number {
    if (params.context.parentComponent.tour && params.context.parentComponent.tour.hasEnded) {
      return ((params.data.totalStagePoints ? params.data.totalStagePoints : 0) +
        (params.data.youthPoints ? params.data.youthPoints : 0) +
        (params.data.mountainPoints ? params.data.mountainPoints : 0) +
        (params.data.tourPoints ? params.data.tourPoints : 0) +
        (params.data.pointsPoints ? params.data.pointsPoints : 0));
    } else {
      return params.data.totalStagePoints ? params.data.totalStagePoints : 0;

    }
  }
}
