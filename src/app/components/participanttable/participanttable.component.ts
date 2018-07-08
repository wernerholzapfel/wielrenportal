import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {Observable} from 'rxjs/Observable';
import {IParticipanttable} from '../../models/participanttable.model';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  tour: ITour;
  data: any;
  participantstable$: Observable<IParticipanttable[]>;
  lastUpdated$: Observable<any>;

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '#', field: 'position', minWidth: 50, maxWidth: 50},
    {headerName: 'Naam', field: 'displayName', minWidth: 200, maxWidth: 200},
    {headerName: 'Totaal', field: 'totalPoints', sort: 'desc', minWidth: 100, maxWidth: 100},
    {headerName: 'Algemeen', field: 'totalTourPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Berg', field: 'totalMountainPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Punten', field: 'totalPointsPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Jongeren', field: 'totalYouthPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
  ];
  rowSelection = 'single';

  constructor(private store: Store<IAppState>, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.participantstable$ = this.store.select(getParticipanttable);
    this.lastUpdated$ = this.store.select(getLastUpdated);

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

  determineClass(params): string {
    // todo
    // return (params.context.parentComponent.tour && !params.context.parentComponent.tour.hasEnded ? 'tour_not_ended' : '');
    return 'tour_not_ended';

  }
}
