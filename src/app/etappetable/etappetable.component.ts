import {Component, OnInit} from '@angular/core';
import {ClassificationsService} from '../services/stageclassifications.service';
import {GridOptions} from 'ag-grid';
import {TourService} from '../services/tour.service';
import {Observable} from 'rxjs/internal/Observable';
import {select, Store} from '@ngrx/store';
import {getDrivenEtappes, getEtappes} from '../store/etappe/etappe.reducer';
import {IAppState} from '../store/store';
import {getTour} from '../store/tour/tour.reducer';
import * as fromEtappe from '../store/etappe/etappe.actions';

@Component({
  selector: 'app-etappetable',
  templateUrl: './etappetable.component.html',
  styleUrls: ['./etappetable.component.scss']
})
export class EtappetableComponent implements OnInit {
  private etappeGridApi;
  private etappeGridColumnApi;
  private etappeAgColumns;
  public etappeGridOptions: GridOptions;
  public etappeRowData: any[];
  private etappeStandGridApi;
  private etappeStandGridColumnApi;
  private etappeStandAgColumns;
  public etappeStandGridOptions: GridOptions;
  public etappeStandRowData: any[];
  public rowClassRules;
  etappes$: Observable<any>;
  selectedEtappe: any;
  etappe: any[];
  rowSelection = 'single';
  etappeId: string;
  tourId: string;

  constructor(private stageClassificationsService: ClassificationsService,
              private tourService: TourService,
              private store: Store<IAppState>) {
    this.etappeAgColumns = [
      {headerName: '#', field: 'position', minWidth: 50, maxWidth: 50},
      {headerName: 'Naam', cellRenderer: this.determineRiderName, minWidth: 200, maxWidth: 200},
      {headerName: 'Punten', valueGetter: this.calculatePoints, minWidth: 200, maxWidth: 200}];

    this.etappeStandAgColumns = [
      {headerName: '#', field: 'position', sort: 'asc', minWidth: 50, maxWidth: 50},
      {headerName: 'Naam', field: 'displayName', minWidth: 200, maxWidth: 200},
      {headerName: 'Punten', field: 'totalStagePoints', minWidth: 200, maxWidth: 200}];

    this.rowClassRules = {
      'selected': function (params) {
        return params.data.selected;
      }
    };
  }

  ngOnInit() {
    this.store.pipe(select(getTour)).subscribe(tour => {
      if (tour && tour.id) {
        this.tourId = tour.id;
        this.store.dispatch(new fromEtappe.FetchEtappeList(tour.id));
      }
    });

    this.etappes$ = this.store.pipe(select(getDrivenEtappes));

    this.etappes$.subscribe(etappes => {
      if (etappes.length > 0) {
        this.selectedEtappe = etappes[0];
        this.fetchData();
      }
    });


    this.etappeGridOptions = <GridOptions>{
      context: {parentComponent: this},
      columnDefs: this.etappeAgColumns,

      onGridReady: (params) => {
        this.etappeGridApi = params.api;

        this.etappeGridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };

    this.etappeStandGridOptions = <GridOptions>{
      columnDefs: this.etappeStandAgColumns,
      onGridReady: () => {
        this.etappeStandGridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
  }

  determineRiderName(params): string {
    return params.data.tourrider.rider.firstName + ' ' + params.data.tourrider.rider.surName + '</div>';
  }

  private fetchEtappeClassification(etappeId: string) {
    this.stageClassificationsService.getStageClassifications(etappeId).subscribe(response => {
      this.etappe = response;
    });
  }

  calculatePoints(params) {
    if (params.data.position) {
      return eval('etappe' + params.data.position);
    }
    return 0;
  }

  onEtappeStandRowSelected(params) {
    if (params.node.selected) {
      this.etappeRowData.map(etappe => {
        console.log(etappe.tourrider.rider.surName);
        return etappe.selected = !!params.data.predictions.find(item => item.rider.id === etappe.tourrider.id);
      });
      this.etappeGridApi.setRowData(this.etappeRowData);
    }
  }

  fetchEtappe() {
    this.fetchData();
  }

  fetchData() {
    this.etappeRowData = [];
    this.etappeStandRowData = [];
    this.stageClassificationsService.getStageClassifications(this.selectedEtappe.id).subscribe(
      response => this.etappeRowData = response
    );

    // todo combineLatest
    this.tourService.getEtappeStand(this.tourId, this.selectedEtappe.id).subscribe(
      response => this.etappeStandRowData = response
    );
  }

  // onEtappeStandRowSelected(params) {
  //   this.etappeGridApi.forEachNode(function (node) {
  //     if (!!params.data.predictions.find(item => item.rider.id === node.data.tourrider.id)) {
  //       node.setSelected(true);
  //     } else {
  //       node.setSelected(false);
  //     }
  //   });
  // }
}


const etappe1 = 60;
const etappe2 = 52;
const etappe3 = 44;
const etappe4 = 38;
const etappe5 = 34;
const etappe6 = 30;
const etappe7 = 28;
const etappe8 = 26;
const etappe9 = 24;
const etappe10 = 22;
const etappe11 = 20;
const etappe12 = 18;
const etappe13 = 16;
const etappe14 = 14;
const etappe15 = 12;
const etappe16 = 10;
const etappe17 = 8;
const etappe18 = 6;
const etappe19 = 4;
const etappe20 = 2;

