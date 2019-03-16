import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {IRider} from '../../models/rider.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {RiderService} from '../../services/rider.service';
import {FetchRiders} from '../../store/rider/rider.actions';
import {getRiders} from '../../store/rider/rider.reducer';
import {Observable} from 'rxjs';
import {GridOptions} from 'ag-grid';
import {getTourRiders} from '../../store/tour/tour.reducer';
import {ITourriders} from '../../models/tourriders.model';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss']
})
export class RidersComponent implements OnInit {

  searchTerm: string;
  riders$: Observable<ITourriders[]>;

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Voornaam', field: 'rider.firstName'},
    {headerName: 'Achternaam', field: 'rider.surName'},
    {headerName: 'Nationaliteit', field: 'rider.nationality'},
    {headerName: 'Positie', field: 'rider.position', editable: true,
      valueParser: this.numberParser},
    {headerName: 'Geboortedag', field: 'rider.dateOfBirth'}];
  dataSource = new MatTableDataSource<IRider>();
  @ViewChild(MatSort) sort: MatSort;

  @Output()
  addPositionEvent: EventEmitter<IRider> = new EventEmitter<IRider>();

  constructor(private riderService: RiderService, private store: Store<IAppState>) {
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */

  ngOnInit() {
    this.store.dispatch(new FetchRiders());
    this.riders$ = this.store.select(getTourRiders);


    this.gridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      singleClickEdit: true
    };
  }

  applyFilter(filterValue: string) {
    this.gridOptions.api.setQuickFilter(filterValue);
  }

  addPosition(element: any) {
    if (element.type === 'cellValueChanged' && element.colDef.field === 'rider.position') {
      const updatedRider = Object.assign(element.data.rider, {position: element.newValue, id: element.data.id});
      this.addPositionEvent.emit(updatedRider);
    }
  }

  formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  numberFormatter(params) {
    return '\xA3' + this.formatNumber(params.value);
  }
  numberParser(params) {
    return Number(params.newValue);
  }

}
