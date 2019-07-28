import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ClassificationsService} from '../../../services/stageclassifications.service';
import {GridOptions} from 'ag-grid';
import {TourService} from '../../../services/tour.service';
import {Observable} from 'rxjs/internal/Observable';
import {select, Store} from '@ngrx/store';
import {getEtappes} from '../../../store/etappe/etappe.reducer';
import {IAppState} from '../../../store/store';
import {getTour} from '../../../store/tour/tour.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, ObservedValueOf, Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {ETAPPE} from '../../../models/constants';

@Component({
  selector: 'app-etappetable',
  templateUrl: './etappetable.component.html',
  styleUrls: ['./etappetable.component.scss']
})
export class EtappetableComponent implements OnInit, OnDestroy {
  private etappeGridApi;
  private etappeAgColumns;
  public etappeGridOptions: GridOptions;
  public etappeRowData: any[] = [];
  private etappeStandGridApi;
  private etappeStandGridColumnApi;
  private etappeStandAgColumns;
  public etappeStandGridOptions: GridOptions;
  public etappeStandRowData: any[] = [];
  public rowClassRules;
  tour$: Observable<any>;
  etappes$: Observable<any>;
  routeParams$: Observable<any>;
  selectedEtappe: any;
  etappe: any[];
  etappes: any[];
  rowSelection = 'single';
  etappeId: string;
  tourId: string;
  unsubscribe = new Subject<void>();
  ETAPPE = ETAPPE;

  constructor(private stageClassificationsService: ClassificationsService,
              private route: ActivatedRoute,
              private router: Router,
              private tourService: TourService,
              private ngZone: NgZone,
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

    this.tour$ = this.store.pipe(select(getTour)).pipe(distinctUntilChanged());

    this.tour$.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe)).subscribe(tour => {
      if (tour && tour.id) {
        console.log(0);
        this.tourId = tour.id;
      }
    });

    this.etappes$ = this.store.pipe(select(getEtappes));
    this.routeParams$ = this.route.params;

    // if route id then find etappe by id in etappes. else get etappes[0]
    combineLatest(this.etappes$.pipe(distinctUntilChanged()), this.routeParams$).pipe(distinctUntilChanged(),
      takeUntil(this.unsubscribe)).subscribe(([etappes, routeParams]) => {
      if (routeParams && !routeParams['id'] && etappes && etappes.length > 0) {
        this.etappes = this.getDrivenEtappes(etappes);
        this.selectedEtappe = this.etappes.length > 0 ? this.etappes[0] : null;
        this.fetchData();
      } else if (routeParams['id'] && etappes && etappes.length > 0) {
        this.etappes = this.getDrivenEtappes(etappes);
        this.selectedEtappe = etappes.find(etappe => etappe.id === routeParams['id']);
        this.fetchData();
      }
    });

    this.etappeGridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      context: {parentComponent: this},
      columnDefs: this.etappeAgColumns,

      onGridReady: (params) => {
        this.etappeGridApi = params.api;

        this.etappeGridOptions.api.sizeColumnsToFit();
      }
    };

    this.etappeStandGridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      columnDefs: this.etappeStandAgColumns,
      onGridReady: (params) => {
        this.etappeStandGridApi = params.api;
        this.etappeStandGridOptions.api.sizeColumnsToFit();
      },
    };
  }


  private getDrivenEtappes(etappes: ObservedValueOf<Observable<any>>) {
    return etappes.filter(item => item.isDriven).sort((a, b) => b.etappeNumber - a.etappeNumber);
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
    if (params.data.position && params.data.selected) {
      return params.data.rolscore;
    } else if (params.data.position) {
      return eval('etappe' + params.data.position);
    } else {
      return 0;
    }
  }

  onEtappeStandRowSelected(params) {
    if (params.node.selected) {

      // vorige uitvallers + waterdragers uitfilteren
      this.etappeRowData = this.etappeRowData
        .filter(item => item.position !== 'Uit' && item.position !== 'WD')
        .map(etappe => {
          // rolscore toevoegen indien renner in uitslag voorkomt
          const zitinuitslag = params.data.predictions.find(item => item.rider.id === etappe.tourrider.id);
          if (zitinuitslag) {
            etappe.rolscore = zitinuitslag.totalStagePoints;
          }
          etappe.selected = !!params.data.predictions.find(item => item.rider.id === etappe.tourrider.id);
          return etappe;
        });

      // waterdagers en uitvallers kunnen zonder in uitslag te zitten toch punten hebben behaald, vandaar deze toevoegen.
      const waterdragerEnUitvallers = params.data.predictions
      // waterdager alleen tonen indien hij niet in etappeRowData zit
        .filter(prediction => prediction.isWaterdrager && !this.etappeRowData.find(item => item.tourrider.id === prediction.rider.id) ||
          (prediction.rider.isOut && prediction.rider.latestEtappe.id === this.selectedEtappe.id))
        .map(item => {
          return {
            id: item.id,
            position: item.rider.isOut ? 'Uit' : 'WD',
            rolscore: item.totalStagePoints,
            selected: true,
            tourrider: item.rider,
          };
        });


      this.etappeRowData = [...this.etappeRowData, ...waterdragerEnUitvallers];
      setTimeout(() => {
        this.etappeGridApi.setRowData(this.etappeRowData);
      }, 500);
    }
  }

  fetchEtappe() {
    this.fetchData();
  }

  fetchData() {
    if (this.etappeGridOptions && this.etappeGridOptions.api) {
      this.etappeGridOptions.api.showLoadingOverlay();
    }
    if (this.etappeStandGridOptions && this.etappeStandGridOptions.api) {
      this.etappeStandGridOptions.api.showLoadingOverlay();
    }

    if (this.selectedEtappe && this.selectedEtappe.id) {
      const getStageClassification$ = this.stageClassificationsService.getStageClassifications(this.selectedEtappe.id);
      const getEtappeStand$ = this.tourService.getEtappeStand(this.tourId, this.selectedEtappe.id);

      combineLatest(getStageClassification$, getEtappeStand$).pipe(takeUntil(this.unsubscribe)).subscribe(([etappe, stand]) => {
        this.etappeRowData = etappe;
        this.etappeStandRowData = stand;
      });
    } else {
      this.etappeRowData = [];
      this.etappeStandRowData = [];
    }
  }
  onRowSelected(event) {
    if (event.node.selected) {
      this.ngZone.run(() =>  this.router.navigateByUrl(`rider/${event.data.tourrider.id}`));
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
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
const etappeUit = -20;
const etappeWD = 0;

