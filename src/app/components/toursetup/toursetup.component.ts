import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromTour from '../../store/tour/tour.actions';
import * as fromEtappe from '../../store/etappe/etappe.actions';
import * as fromTeam from '../../store/team/team.actions';
import * as fromRider from '../../store/rider/rider.actions';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ITour} from '../../models/tour.model';
import {combineLatest, Observable, Subject} from 'rxjs';

import {getTour, getTourInProgress, getTours, getTourTeams} from '../../store/tour/tour.reducer';
import {ITeam} from '../../models/team.model';
import {getTeams} from '../../store/team/team.reducer';

import {TourService} from '../../services/tour.service';
import {IRider} from '../../models/rider.model';
import {getRiders} from '../../store/rider/rider.reducer';

import {ITourriders} from '../../models/tourriders.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {GridOptions} from 'ag-grid';
import {AddStageClassificationsComponent} from '../etappes/dialog/add-stage-classifications/add-stage-classifications.component';
import {
  MOUNTAINCLASSIFICATION,
  POINTSCLASSIFICATION,
  TOURCLASSIFICATION,
  YOUTHCLASSIFICATION
} from '../../models/constants';
import {EdittourriderdialogComponent} from '../edittourriderdialog/edittourriderdialog.component';
import * as moment from 'moment';
import {HeadlinesEditComponent} from '../headlines-edit/headlines-edit.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-toursetup',
  templateUrl: './toursetup.component.html',
  styleUrls: ['./toursetup.component.scss']
})
export class ToursetupComponent implements OnInit, OnDestroy {

  constructor(private store: Store<IAppState>, private tourService: TourService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Renner', field: 'rider.surNameShort'},
    {headerName: 'Waarde', field: 'waarde', sort: 'desc', width: 124},
    {headerName: 'Uitgevallen', field: 'isOut', width: 124},
    {headerName: 'Nat.', field: 'rider.nationality', width: 70},
  ];
  rowSelection = 'single';

  isLoading: boolean;
  selectedTour: ITour;
  tours$: Observable<ITour[]>;
  riders$: Observable<IRider[]>;
  tourTeams$: Observable<ITeam[]>;
  teams$: Observable<ITeam[]>;
  selectableTeamList: ITeam[];
  selectableRiders: IRider[];
  currentRider: IRider;
  selectedTab = 0;
  TOURCLASSIFICATION = TOURCLASSIFICATION;
  YOUTHCLASSIFICATION = YOUTHCLASSIFICATION;
  MOUNTAINCLASSIFICATION = MOUNTAINCLASSIFICATION;
  POINTSCLASSIFICATION = POINTSCLASSIFICATION;
  filterText: string;
  unsubscribe = new Subject<void>();

  ngOnInit() {
    this.store.dispatch(new fromTeam.FetchTeams());
    this.store.dispatch(new fromRider.FetchRiders());

    this.store.select(getTourInProgress).pipe(takeUntil(this.unsubscribe)).subscribe(inProgress => {
      this.isLoading = inProgress;
    });

    this.store.select(getTour).pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
      if (tour) {
        this.selectedTour = tour;
        this.store.dispatch(new fromEtappe.FetchEtappeList(tour.id));
      }
    });

    this.tourTeams$ = this.store.select(getTourTeams);
    this.tours$ = this.store.select(getTours);
    this.teams$ = this.store.select(getTeams);
    this.riders$ = this.store.select(getRiders);

    combineLatest(this.teams$, this.tourTeams$).pipe(takeUntil(this.unsubscribe)).subscribe(
      ([teams, tourteams]) => {
        this.selectableTeamList = Object.assign(teams.map(team => {
          if (tourteams && tourteams.find(tt => tt.id === team.id)) {
            return Object.assign(team, {selected: true});
          } else {
            return Object.assign(team, {selected: false});
          }
        }));
        console.log(this.selectableTeamList);
      });

    combineLatest(this.tourTeams$, this.riders$).pipe(takeUntil(this.unsubscribe)).subscribe(
      ([tourTeams, riders]) => {
        if (riders && tourTeams && tourTeams.length > 0) {
          let flattenTourRiders: ITourriders[] = [];
          tourTeams.map(tourteam => {
            flattenTourRiders = [...flattenTourRiders, ...tourteam.tourRiders];
          });
          this.selectableRiders = riders.filter(rider => !(flattenTourRiders.find(ftr => ftr.rider.id === rider.id)));
        }
      });


    this.gridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        resizable: true,
        enableFilter: true
      },
      columnDefs: this.agColumns,
      onGridReady: () => {
      },
    };
  }

  saveTeams(list) {
    const selectedTeams = list.selectedOptions.selected.map(item => item.value);

    this.tourService.addTeams({
      tour: this.selectedTour,
      teams: selectedTeams
    }).subscribe(response => {
      this.snackBar.open('Het opslaan is gelukt', '', {
        duration: 2000,
      });
      this.selectedTab = 1;
    }, error => {
      this.snackBar.open(error, '', {
        duration: 2000,
      });
    });
  }

  setCurrentRider(rider, $event) {
    this.currentRider = rider;
    $event.stopPropagation();
  }

  addCurrentRiderToTeam(team) {
    this.store.dispatch(new fromTour.SaveRiderToTeam({
      team: team,
      tour: this.selectedTour,
      waarde: this.currentRider.waarde,
      rider: this.currentRider
    }));

  }

  updateTable() {
    this.tourService.updateStand(this.selectedTour.id).subscribe(response => {
      console.log(response);
    });
  }

  openClassificationsModal(type: string) {
    const dialogRef = this.dialog.open(AddStageClassificationsComponent, {
      data: {
        type: type,
        form: {
          uitslag: [],
          tour: this.selectedTour
        }
      },
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  onRiderRowSelected(event, team) {
    if (event.node.selected) {
      Object.assign(event.data, {team: {id: team.id}});
      Object.assign(event.data, {tour: this.selectedTour});
      this.openEditTourRiderDialog(event.data);
    }
  }

  openEditTourRiderDialog(data: IRider) {
    const dialogRef = this.dialog.open(EdittourriderdialogComponent, {
      data: data,
      width: '90%',
    });

    // todo move to store ?
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.tourriderservice.saveEtappe(result).subscribe(response => {
        //   this.etappes = [...this.etappes, response];
        // });
      }
    });
  }

  youngster(rider: IRider) {
    return moment(rider.dateOfBirth).isAfter('1994-01-01');
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
