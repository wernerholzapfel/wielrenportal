import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {Router} from '@angular/router';
import * as fromParticipanttable from '../../store/participanttable/participanttable.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTourTeams} from '../../store/tour/tour.reducer';
import {getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {Observable} from 'rxjs/Observable';
import {IParticipanttable} from '../../models/participanttable.model';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit {

  data: any;
  participantstable$: Observable<IParticipanttable[]>;

  // public gridOptions: GridOptions;
  // agColumns = [
  //   {headerName: 'Renner', cellRenderer: this.determineRole, minWidth: 200},
  //   {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 80},
  //   {headerName: 'Totaalpunten', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 80},
  //   {headerName: 'Etappes', valueGetter: this.formatEtappeTotaalpunten, minWidth: 100},
  //   {headerName: 'Tour', field: 'tourPoints', minWidth: 80},
  //   {headerName: 'Berg', field: 'mountainPoints', minWidth: 80},
  //   {headerName: 'Jongeren', field: 'youthPoints', minWidth: 80},
  //   {headerName: 'Punten', field: 'pointsPoints', minWidth: 80},
  //   {headerName: 'Waarde', field: 'rider.waarde', minWidth: 80},
  //   // {headerName: 'Totaal', field: 'totalPoints'}
  // ];
  // rowSelection = 'single';

  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //
  //   params.api.sizeColumnsToFit();
  // }

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


  constructor(private store: Store<IAppState>, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    // todo move to store
    this.store.dispatch(new fromParticipanttable.FetchParticipanttable());
    this.participantstable$ = this.store.select(getParticipanttable);

    // this.gridOptions = <GridOptions>{
    //   columnDefs: this.agColumns,
    //   onGridReady: () => {
    //     this.gridOptions.api.sizeColumnsToFit();
    //   },
    //   enableSorting: true,
    // };
  }

  // onRowSelected(event, participant) {
    // if (event.node.selected) {
    //   // this.participants.find(item => item.id === participant.id).selectedRider = event.data;
    //   this.data = event.data;
    //   this.openTourRidersDetailDialog(event.data);
    // }
  // }

  // openTourRidersDetailDialog(data: any) {
  //   const dialogRef = this.dialog.open(TourriderdetaildialogComponent, {
  //     data: data,
  //     width: '90%',
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('closed')
  //     this.gridOptions.api.deselectAll();
  //   });
  // }
}
