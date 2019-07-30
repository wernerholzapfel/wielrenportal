import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {IStageClassification} from '../../models/etappe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RiderService} from '../../services/rider.service';
import {IPrediction} from '../../models/participant.model';
import {IRider} from '../../models/rider.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-tourriderdetail',
  templateUrl: './tourrider-detail.component.html',
  styleUrls: ['./tourrider-detail.component.scss']
})
export class TourriderDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private riderService: RiderService,
              private db: AngularFireDatabase,
              public store: Store<IAppState>) {
  }

  public gridOptions: GridOptions;
  public participantsGridOptions: GridOptions;

  rider: IRider;
  predictions: IPrediction[];
  stageclassifications: IStageClassification[];
  unsubscribe = new Subject<void>();
  agColumns = [
    {headerName: '#', field: 'etappe.etappeNumber', sort: 'asc', width: 75},
    {headerName: 'Etappe', field: 'etappe.etappeName'},
    {headerName: 'Positie', field: 'position', width: 135},
    {headerName: 'Punten', field: 'stagePoints', width: 135}
  ];

  participantsAgColumns = [
    {headerName: 'Naam', field: 'participant.displayName'},
    {headerName: 'Rol', cellRenderer: this.determineRole},
  ];

  ngOnInit() {
    this.participantsGridOptions = <GridOptions> {
      defaultColDef: {
        sortable: true
      },
      columnDefs: this.participantsAgColumns,
      localeText: {noRowsToShow: 'Renner is niet gekozen'},
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
    };
    this.gridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true
      },
      columnDefs: this.agColumns,
      localeText: {noRowsToShow: 'Geen score in etappes'},
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
    };

    this.route.params.pipe(takeUntil(this.unsubscribe)).subscribe(routeParams => {
      if (routeParams['id']) {
        this.riderService.getTourriderDetails(routeParams['id'])
          .subscribe(tourrider => {
          if (tourrider) {
            this.rider = tourrider.rider;
            this.stageclassifications = tourrider.stageclassifications;
            this.predictions = tourrider.predictions;
          }
        });
      }
    });
  }

  determineRole(params): string {
    // todo implement with mat-icon and mat-tooltip https://plnkr.co/edit/?p=preview
    if (params.data.isWaterdrager) {
      return '<div><mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">delete_outline</mat-icon>' +
        'Waterdrager';
    }
    if (params.data.isLinkebal) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">new_releases</mat-icon>' +
        'Joker';
    }
    if (params.data.isBeschermdeRenner) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">verified_user</mat-icon>' +
        'Beschermde renner';
    }
    if (params.data.isMeesterknecht) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">build</mat-icon>' +
        'Meesterknecht';
    } else {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">directions_bike</mat-icon>' +
        'Renner';
    }
  }

  onParticipantRowSelected(event) {
    if (event.node.selected) {
      this.router.navigateByUrl(`table/detail/${event.data.participant.id}`);
    }
  }

  onEtappeRowSelected(event) {
    if (event.node.selected) {
      this.router.navigateByUrl(`uitslagen/etappe/${event.data.etappe.id}`);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
