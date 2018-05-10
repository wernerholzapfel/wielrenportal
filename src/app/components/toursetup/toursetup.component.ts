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
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-toursetup',
  templateUrl: './toursetup.component.html',
  styleUrls: ['./toursetup.component.scss']
})
export class ToursetupComponent implements OnInit {

  constructor(private store: Store<IAppState>, private tourService: TourService, public snackBar: MatSnackBar) {
  }

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
        this.selectedTour = tours.find(tour => tour.isActive)
        this.store.dispatch(new fromTour.FetchTourById(this.selectedTour.id))
        this.tours = tours;
      }
    });
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
}
