import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  BERGKLASSEMENT,
  ALGEMEENKLASSEMENT,
  JONGERENKLASSEMENT,
  KLASSEMENT,
  PUNTENKLASSEMENT
} from '../../../models/constants';
import {ClassificationsService} from '../../../services/stageclassifications.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../store/store';
import {getTour} from '../../../store/tour/tour.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {GridOptions} from 'ag-grid';
import {of, Subject} from 'rxjs';
import {getParticipanttable} from '../../../store/participanttable/participanttable.reducer';
import {IParticipanttable} from '../../../models/participanttable.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-klassementen',
  templateUrl: './klassementen.component.html',
  styleUrls: ['./klassementen.component.scss']
})
export class KlassementenComponent implements OnInit, OnDestroy {

  KLASSEMENT = KLASSEMENT;
  klassementuitslag: any[];
  klassementen = [{klassementsType: ALGEMEENKLASSEMENT},
    {klassementsType: BERGKLASSEMENT},
    {klassementsType: PUNTENKLASSEMENT},
    {klassementsType: JONGERENKLASSEMENT}
    ];
  selectedKlassement = this.klassementen[0];
  participantstable: IParticipanttable[];

  public klassementGridOptions: GridOptions;
  public participantStandGridOptions: GridOptions;
  public klassementGridApi;
  public klassementAgColumns;
  public participantStandAgColumns;
  public participantStandGridApi;
  rowClassRules: any;
  rowSelection = 'single';
  unsubscribe = new Subject<void>();

  constructor(private stageClassificationsService: ClassificationsService, private store: Store<IAppState>, private router: Router) {
    this.rowClassRules = {
      'selected': function (params) {
        return params.data.selected;
      }
    };
  }

  ngOnInit() {
    this.klassementAgColumns = [
      {headerName: '#', field: 'position', minWidth: 50, maxWidth: 50},
      {headerName: 'Naam', cellRenderer: this.determineRiderName, minWidth: 200, maxWidth: 200},
      {headerName: 'Punten', field: 'ag-grid-punten', minWidth: 200, maxWidth: 200}
    ];
    this.participantStandAgColumns = [
      // {headerName: '#', valueGetter: this.formatPosition, minWidth: 75, maxWidth: 75},
      {headerName: 'Teamnaam', field: 'displayName', minWidth: 200, maxWidth: 200},
      // {headerName: 'Teamnaam', valueGetter: this.formatTeamnaam, minWidth: 200, maxWidth: 200},
      {
        headerName: 'Algemeen',
        field: 'totalTourPoints',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Berg',
        field: 'totalMountainPoints',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Punten',
        field: 'totalPointsPoints',
        minWidth: 100,
        maxWidth: 100
      },
      {
        headerName: 'Jongeren',
        field: 'totalYouthPoints',
        minWidth: 100,
        maxWidth: 100
      }];

    this.klassementGridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      context: {parentComponent: this},
      columnDefs: this.klassementAgColumns,

      onGridReady: (params) => {
        this.fetchTourClassification();
        this.klassementGridApi = params.api;
      }
    };

    this.participantStandGridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      columnDefs: this.participantStandAgColumns,
      onGridReady: (params) => {
        this.participantStandGridApi = params.api;
        this.fetchParticipantStand();

      }
    };
  }

  fetchKlassement(event) {
    switch (event.value.klassementsType) {
      case BERGKLASSEMENT:
        this.fetchMountainClassification();
        break;
      case JONGERENKLASSEMENT:
        this.fetchYouthClassification();
        break;
      case ALGEMEENKLASSEMENT:
        this.fetchTourClassification();
        break;
      case PUNTENKLASSEMENT:
        this.fetchPointsClassification();

        break;
      default:
        console.log('default');
    }
  }

  private fetchParticipantStand() {
    this.store.pipe(select(getParticipanttable)).pipe(takeUntil(this.unsubscribe)).subscribe(pt => {
      this.participantstable = pt;
      this.participantStandGridOptions.api.setRowData(this.participantstable);
      this.participantStandGridOptions.api.sizeColumnsToFit();
    });
  }

  private fetchTourClassification() {
    this.store.select(getTour).pipe(switchMap(tour => {
      if (tour && tour.id) {
        return this.stageClassificationsService.getTourClassifications(tour.id);
      } else {
        return of(undefined);
      }
    })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response) {
        this.setRowData(response.map(item => item), TOURFACTOR);
        this.participantStandGridOptions.api.setSortModel([{colId: 'totalTourPoints', sort: 'desc'}]);
      }
    });
  }


  private fetchYouthClassification() {
    this.store.select(getTour).pipe(switchMap(tour => {
      if (tour && tour.id) {
        return this.stageClassificationsService.getYouthClassifications(tour.id);
      } else {
        return of(undefined);
      }
    })).subscribe(response => {
      if (response) {
        this.setRowData(response.map(item => item), YOUTHFACTOR);
        this.participantStandGridOptions.api.setSortModel([{colId: 'totalYouthPoints', sort: 'desc'}]);

      }
    });
  }

  private fetchMountainClassification() {
    this.store.select(getTour).pipe(switchMap(tour => {
      if (tour && tour.id) {
        return this.stageClassificationsService.getMountainClassifications(tour.id);
      } else {
        return of(undefined);
      }
    })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response) {
        this.setRowData(response.map(item => item), MOUNTAINFACTOR);
        this.participantStandGridOptions.api.setSortModel([{colId: 'totalMountainPoints', sort: 'desc'}]);
      }
    });
  }

  private fetchPointsClassification() {
    this.store.select(getTour).pipe(switchMap(tour => {
      if (tour && tour.id) {
        return this.stageClassificationsService.getPointsClassifications(tour.id);
      } else {
        return of(undefined);
      }
    })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response) {
        this.setRowData(response.map(item => item), POINTSFACTOR);
        this.participantStandGridOptions.api.setSortModel([{colId: 'totalPointsPoints', sort: 'desc'}]);
      }
    });
  }

  private setRowData(rowdata: any[], factor: number) {
    this.klassementuitslag = rowdata.map(item => Object.assign(item, {'ag-grid-punten': factor * eval('PUNTEN_POSITIE' + item.position)}));
    this.klassementGridOptions.api.setRowData(this.klassementuitslag);
    this.klassementGridOptions.api.sizeColumnsToFit();
    this.participantStandGridOptions.api.deselectAll();
    this.klassementGridOptions.api.deselectAll();
  }

  determineRiderName(params): string {
    return params.data.tourrider.rider.firstName + ' ' + params.data.tourrider.rider.surName + '</div>';
  }

  onStandRowSelected(params) {
    if (params.node.selected) {

      this.klassementuitslag = this.klassementuitslag
        .map(klassement => {
          klassement.selected = !!params.data.predictions.find(item => item.rider.id === klassement.tourrider.id);
          return klassement;
        });
    }
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.router.navigateByUrl(`rider/${event.data.tourrider.id}`);
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

const PUNTEN_POSITIE1 = 60;
const PUNTEN_POSITIE2 = 52;
const PUNTEN_POSITIE3 = 44;
const PUNTEN_POSITIE4 = 38;
const PUNTEN_POSITIE5 = 34;
const PUNTEN_POSITIE6 = 30;
const PUNTEN_POSITIE7 = 28;
const PUNTEN_POSITIE8 = 26;
const PUNTEN_POSITIE9 = 24;
const PUNTEN_POSITIE10 = 22;
const PUNTEN_POSITIE11 = 20;
const PUNTEN_POSITIE12 = 18;
const PUNTEN_POSITIE13 = 16;
const PUNTEN_POSITIE14 = 14;
const PUNTEN_POSITIE15 = 12;
const PUNTEN_POSITIE16 = 10;
const PUNTEN_POSITIE17 = 8;
const PUNTEN_POSITIE18 = 6;
const PUNTEN_POSITIE19 = 4;
const PUNTEN_POSITIE20 = 2;
const PUNTEN_POSITIEUit = -20;
const PUNTEN_POSITIEWD = 0;


const TOURFACTOR = 2.5;
const MOUNTAINFACTOR = 2;
const YOUTHFACTOR = 1.5;
const POINTSFACTOR = 2;
