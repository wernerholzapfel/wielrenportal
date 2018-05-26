import {Component, OnInit} from '@angular/core';
import * as fromTour from '../../store/tour/tour.actions';
import * as fromTeam from '../../store/team/team.actions';
import * as fromRider from '../../store/rider/rider.actions';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ITour} from '../../models/tour.model';
import {Observable} from 'rxjs/Observable';
import {getTours, getTourTeams} from '../../store/tour/tour.reducer';
import {ITeam} from '../../models/team.model';
import {getTeams} from '../../store/team/team.reducer';
import 'rxjs/add/observable/combineLatest';
import {TourService} from '../../services/tour.service';
import {IRider} from '../../models/rider.model';
import {getRiders} from '../../store/rider/rider.reducer';
import 'rxjs/add/operator/mergeMap';
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

@Component({
  selector: 'app-toursetup',
  templateUrl: './toursetup.component.html',
  styleUrls: ['./toursetup.component.scss']
})
export class ToursetupComponent implements OnInit {

  constructor(private store: Store<IAppState>, private tourService: TourService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Renner', field: 'rider.surNameShort'},
    {headerName: 'Waarde', field: 'waarde', sort: 'desc', width: 135},
    {headerName: 'Uitgevallen', field: 'isOut', width: 135},
    {headerName: 'Nationaliteit', field: 'rider.nationality', width: 135},
  ];
  rowSelection = 'single';

  selectedTour: ITour;
  tours$: Observable<ITour[]>;
  tours: ITour[];
  riders$: Observable<IRider[]>;
  tourTeams$: Observable<ITeam[]>;
  teams$: Observable<ITeam[]>;
  selectedTeams$: Observable<ITeam[]>;
  selectableTeamList: ITeam[];
  selectableRiders: IRider[];
  currentRider: IRider;
  selectedTab = 0;
  selected: ITour;
  TOURCLASSIFICATION = TOURCLASSIFICATION;
  YOUTHCLASSIFICATION = YOUTHCLASSIFICATION;
  MOUNTAINCLASSIFICATION = MOUNTAINCLASSIFICATION;
  POINTSCLASSIFICATION = POINTSCLASSIFICATION;

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTourList());
    this.store.dispatch(new fromTeam.FetchTeams());
    this.store.dispatch(new fromRider.FetchRiders());

    this.tourTeams$ = this.store.select(getTourTeams);
    this.tours$ = this.store.select(getTours);
    this.teams$ = this.store.select(getTeams);
    this.riders$ = this.store.select(getRiders);

    Observable.combineLatest(this.teams$, this.tourTeams$).subscribe(
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

    Observable.combineLatest(this.tourTeams$, this.riders$).subscribe(
      ([tourTeams, riders]) => {
        if (riders && tourTeams.length > 0) {
          let flattenTourRiders: ITourriders[] = [];
          tourTeams.map(tourteam => {
            flattenTourRiders = [...flattenTourRiders, ...tourteam.tourRiders];
          });
          this.selectableRiders = riders.filter(rider => !(flattenTourRiders.find(ftr => ftr.rider.id === rider.id)));
        }
      });

    this.tours$.subscribe(tours => {
      if (tours && tours.length > 0) {
        this.selectedTour = tours.find(tour => tour.isActive);
        this.store.dispatch(new fromTour.FetchTourById(this.selectedTour.id));
        this.tours = tours;
      }
    });
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
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

  fetchTour() {
    this.store.dispatch(new fromTour.FetchTourById(this.selectedTour.id));
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
      // height: '90%'
    });

    // todo move to store ?
    // todo check voor wijzigingen
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
      width: '400px'
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
}
