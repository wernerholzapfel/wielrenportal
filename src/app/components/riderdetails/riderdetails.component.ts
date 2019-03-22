import {Component, OnInit} from '@angular/core';
import {RiderService} from '../../services/rider.service';
import {GridOptions} from 'ag-grid';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {HastourendedclassComponent} from '../../aggridcomponents/hastourendedclass/hastourendedclass.component';
import {IRider} from '../../models/rider.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-riderdetails',
  templateUrl: './riderdetails.component.html',
  styleUrls: ['./riderdetails.component.scss']
})
export class RiderdetailsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  totalRiders: IRider[];
  tour: ITour;
  public gridOptions: GridOptions;
  defaultRowClassRules = {
    'uitgevallen': function (params) {
      return params.data.isOut;
    }
  };

  defaultHeaders = [{headerName: '', cellRenderer: this.determineFlag, minWidth: 50, maxWidth: 50},
    {
      headerName: 'Renner',
      cellRenderer: this.determineName,
      minWidth: 200,
      maxWidth: 200,
      getQuickFilterText: this.determineName
    },
    {headerName: 'Team', field: 'team.teamName', minWidth: 100, maxWidth: 100}];

  defaultAgColumns = [
    {valueGetter: 'node.rowIndex + 1', minWidth: 50, maxWidth: 50},
    ...this.defaultHeaders,
    {headerName: 'Etappes', field: 'totalStagePoints', minWidth: 100, maxWidth: 100},
    {headerName: 'Algemeen', field: 'tourPoints', cellRenderer: 'hasTourEndedClass', minWidth: 100, maxWidth: 100},
    {headerName: 'Berg', field: 'mountainPoints', cellRenderer: 'hasTourEndedClass', minWidth: 100, maxWidth: 100},
    {headerName: 'Punten', field: 'pointsPoints', cellRenderer: 'hasTourEndedClass', minWidth: 100, maxWidth: 100},
    {headerName: 'Jongeren', field: 'youthPoints', cellRenderer: 'hasTourEndedClass', minWidth: 100, maxWidth: 100},
    {headerName: 'Totaal', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 100, maxWidth: 100},
    {headerName: 'Waterdrager', valueGetter: this.determineWDTotaalpunten, minWidth: 120, maxWidth: 120},
    {headerName: 'Waarde', field: 'waarde', minWidth: 100, maxWidth: 100}];

  aantalKeerGekozenAgColumns = [
    ...this.defaultHeaders,
    {
      headerName: '# RE',
      valueGetter: this.determineRiderChoosenCount,
      sort: 'desc',
      minWidth: 80,
      maxWidth: 80,
    },
    {headerName: '# BR', valueGetter: this.determineBeschermderennerChoosenCount, minWidth: 80, maxWidth: 80},
    {
      headerName: '# MK',
      valueGetter: this.determineMeesterknechtChoosenCount,
      minWidth: 80,
      maxWidth: 80
    },
    {headerName: '# WD', valueGetter: this.determineWaterdragerChoosenCount, minWidth: 80, maxWidth: 80},
    {headerName: '# LB', valueGetter: this.determineLinkebalChoosenCount, minWidth: 80, maxWidth: 80},
  ];

  uitgevallenAgColumns = [
    ...this.defaultHeaders,
    {headerName: 'Waarde', field: 'waarde', minWidth: 100, maxWidth: 100},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 60, maxWidth: 60},
    {headerName: 'Etappe', field: 'latestEtappe.etappeNumber', sort: 'desc', minWidth: 100, maxWidth: 100}
  ];

  rowSelection = 'single';
  frameworkComponents = {
    hasTourEndedClass: HastourendedclassComponent,
  };

  constructor(private riderService: RiderService,
              private router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      localeText: {noRowsToShow: 'Na de deadline verschijnen hier de statistieken van de renners'
        // , loadingOoo: 'Bezig met ophalen van de gegevens...'
      },
      context: {parentComponent: this},
      columnDefs: this.defaultAgColumns,
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.store.select(getTour).subscribe(tour => {
          this.tour = tour;
          this.gridApi.showLoadingOverlay();
          if (new Date(this.tour.deadline) < new Date()) {
            // todo refactor for example  subscribe until
            // todo move to store?
            this.riderService.getDetailTourriders(tour.id)
              .subscribe(response => {
                this.totalRiders = response;
                this.gridApi.setRowData(this.totalRiders);
              });
          } else {
            this.totalRiders = [];
            this.gridApi.setRowData(this.totalRiders);
          }
        });

        this.gridOptions.api.sizeColumnsToFit();
      },
      rowClassRules: this.defaultRowClassRules
    };
  }

  determineIsOutText(params): string {
    return (params.data && params.data.isOut) ? 'Ja' : 'Nee';
  }

  determineWDTotaalpunten(params): number {
    if (params.context.parentComponent.tour && params.context.parentComponent.tour.hasEnded) {
      return params.data.waterdragerTruienPoints + params.data.waterdragerEtappePoints;
    } else {
      return params.data.waterdragerEtappePoints;
    }
  }

  determineTotaalpunten(params): number {
    if (params.context.parentComponent.tour.hasEnded) {
      return ((params.data.totalStagePoints ? params.data.totalStagePoints : 0) +
        (params.data.youthPoints ? params.data.youthPoints : 0) +
        (params.data.mountainPoints ? params.data.mountainPoints : 0) +
        (params.data.tourPoints ? params.data.tourPoints : 0) +
        (params.data.pointsPoints ? params.data.pointsPoints : 0));
    } else {
      return params.data.totalStagePoints ? params.data.totalStagePoints : 0;

    }
  }

  determineName(params): string {
    return params.data.rider.firstName + ' ' + params.data.rider.surName + '</div>';
  }

  determineRiderChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isRider).length;
  }

  determineWaterdragerChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isWaterdrager).length;
  }

  determineLinkebalChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isLinkebal).length;
  }

  determineBeschermderennerChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isBeschermdeRenner).length;
  }

  determineMeesterknechtChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isMeesterknecht).length;
  }

  determineFlag(params): string {
    const url = '/assets/images/flag/' + params.data.rider.nationality + '.png';
    return '<img class="ag-grid-icon" style="height: 18px;" src=' + url + '>';
  }

  applyFilter(filterValue: string) {
    this.gridOptions.api.setQuickFilter(filterValue);
  }

  uitgevallenTabel() {
    this.gridOptions.api.setRowData(this.totalRiders.filter(rider => rider.isOut));
    this.gridOptions.api.setColumnDefs(this.uitgevallenAgColumns);
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.rowClassRules = {
      '': function (params) {
        return params.data.isOut;
      }
    };
  }

  defaultTabel() {
    this.gridOptions.api.setRowData(this.totalRiders);
    this.gridOptions.api.setColumnDefs(this.defaultAgColumns);
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.rowClassRules = this.defaultRowClassRules;
  }

  aantalKeerGekozenTabel() {
    this.gridOptions.api.setRowData(this.totalRiders);
    this.gridOptions.api.setColumnDefs(this.aantalKeerGekozenAgColumns);
    this.gridOptions.api.sizeColumnsToFit();
    this.gridOptions.rowClassRules = this.defaultRowClassRules;

  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.router.navigateByUrl(`rider/${event.data.id}`);
    }
  }
}

