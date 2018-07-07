import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getLastUpdated, getParticipanttable} from '../../store/participanttable/participanttable.reducer';
import {Observable} from 'rxjs/Observable';
import {IParticipanttable} from '../../models/participanttable.model';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  data: any;
  participantstable$: Observable<IParticipanttable[]>;
  lastUpdated$: Observable<any>;

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '#', field: 'position', width: 50},
    // {headerName: 'Renner', cellRenderer: this.determineRole, minWidth: 200},
    // {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 80},
    // {headerName: 'Totaalpunten', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 80},
    //   {headerName: 'Etappes', valueGetter: this.formatEtappeTotaalpunten, minWidth: 100},
    //   {headerName: 'Tour', field: 'tourPoints', minWidth: 80},
    //   {headerName: 'Berg', field: 'mountainPoints', minWidth: 80},
    //   {headerName: 'Jongeren', field: 'youthPoints', minWidth: 80},
    //   {headerName: 'Punten', field: 'pointsPoints', minWidth: 80},
    {headerName: 'Naam', field: 'displayName', width: 200},
    {headerName: 'Totaal', field: 'totalPoints', sort: 'desc', width: 100},
  ];
  rowSelection = 'single';

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  constructor(private store: Store<IAppState>, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.participantstable$ = this.store.select(getParticipanttable);
    this.lastUpdated$ = this.store.select(getLastUpdated);

    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
  }

  applyFilter(filterValue: string) {
    this.gridOptions.api.setQuickFilter(filterValue);
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.router.navigate(['/table/detail/', event.data.id]);
    }
  }
}
