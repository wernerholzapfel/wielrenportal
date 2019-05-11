import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {Observable, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {HastourendedclassComponent} from '../../aggridcomponents/hastourendedclass/hastourendedclass.component';
import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit, OnDestroy {
  private gridApi;
  private gridColumnApi;
  private agColumns;

  rowSelection;
  frameworkComponents;
  context;
  tour: ITour;
  data: any;
  participantstable$: Observable<IParticipanttable[]>;
  lastUpdated$: Observable<any>;
  unsubscribe = new Subject<void>();

  public gridOptions: GridOptions;
  public lastUpdated: string;

  constructor(private store: Store<IAppState>, public dialog: MatDialog, private router: Router) {
    moment.locale('nl');

    this.agColumns = [
      {headerName: '#', valueGetter: this.formatPosition, minWidth: 75, maxWidth: 75},
      {headerName: 'Teamnaam', valueGetter: this.formatTeamnaam, minWidth: 200, maxWidth: 200},
      {headerName: 'Totaal', valueGetter: this.formatTotaalpunten, minWidth: 100, maxWidth: 100},
      {headerName: 'Etappes', field: 'totalStagePoints', minWidth: 100, maxWidth: 100},
      {
        headerName: 'Truien',
        valueGetter: this.determineTruienPoints,
        cellRenderer: 'hasTourEndedClass',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Algemeen',
        field: 'totalTourPoints',
        cellRenderer: 'hasTourEndedClass',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Berg',
        field: 'totalMountainPoints',
        cellRenderer: 'hasTourEndedClass',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Punten',
        field: 'totalPointsPoints',
        cellRenderer: 'hasTourEndedClass',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Jongeren',
        field: 'totalYouthPoints',
        cellRenderer: 'hasTourEndedClass',
        minWidth: 100,
        maxWidth: 100
      },
    ];
    this.rowSelection = 'single';
    this.context = {componentParent: this};
    this.frameworkComponents = {
      hasTourEndedClass: HastourendedclassComponent,
    };
  }

  ngOnInit() {

    this.participantstable$ = this.store.pipe(select(getParticipanttable));
    this.lastUpdated$ = this.store.pipe(select(getLastUpdated));

    this.lastUpdated$.pipe(takeUntil(this.unsubscribe)).subscribe(lastupdated => {
      if (lastupdated) {
        this.lastUpdated = moment(lastupdated.lastUpdated).fromNow();
      }
    });
    this.gridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      context: {parentComponent: this},
      columnDefs: this.agColumns
    };
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.store.pipe(select(getTour)).pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
      this.tour = tour;
    });

    params.api.sizeColumnsToFit();
  }

  applyFilter(filterValue: string) {
    this.gridOptions.api.setQuickFilter(filterValue);
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.router.navigate(['/table/detail/', event.data.id]);
    }
  }

  formatPosition(params): string {
    const deltaPositie = params.data.previousPosition ? params.data.previousPosition - params.data.position : 0;
    if (deltaPositie > 0) {
      return params.data.position + ' (+' + deltaPositie + ')';
    } else {
      if (deltaPositie !== 0) {
        return params.data.position + ' (' + deltaPositie + ')';
      }
      return params.data.position;
    }
  }

  determineTruienPoints(params): number {
    return params.data.totalTourPoints + params.data.totalMountainPoints + params.data.totalPointsPoints + params.data.totalYouthPoints;
  }


  formatTeamnaam(params): string {
    return params.data.teamName ? params.data.teamName : params.data.displayName;
  }

  formatTotaalpunten(params): string {
    const addendum: string =
      (params.data.deltaTotalStagePoints && params.data.deltaTotalStagePoints > 0) ? ' (+' + params.data.deltaTotalStagePoints + ')' :
        (!params.data.deltaTotalStagePoints || params.data.deltaTotalStagePoints === 0) ? '' :
          ' (' + params.data.deltaTotalStagePoints + ')';
    return params.data.totalPoints + addendum;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
