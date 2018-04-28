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

@Component({
  selector: 'app-toursetup',
  templateUrl: './toursetup.component.html',
  styleUrls: ['./toursetup.component.scss']
})
export class ToursetupComponent implements OnInit {

  constructor(private store: Store<IAppState>, private tourService: TourService) {
  }

  selectedTour: ITour;
  tours$: Observable<ITour[]>;
  tourTeams$: Observable<ITeam[]>;
  teams$: Observable<ITeam[]>;
  selectedTeams$: Observable<ITeam[]>;
  selectableTeamList: ITeam[];

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTourList());
    this.store.dispatch(new fromTeam.FetchTeams());
    this.store.dispatch(new fromRider.FetchRiders());

    this.tourTeams$ = this.store.select(getTourTeams);
    this.tours$ = this.store.select(getTours);
    this.teams$ = this.store.select(getTeams);

    Observable.combineLatest(this.teams$, this.tourTeams$).subscribe(
      ([teams, tourteams]) => {
        this.selectableTeamList = Object.assign(teams.map(team => {
          if (tourteams.find(tt => tt.id === team.id)) {
            return Object.assign(team, {selected: true});
          } else {
            return Object.assign(team, {selected: false});
          }
        }));
        console.log(this.selectableTeamList);
      });
  }

  saveTeams(list) {
    console.log('ik ga opslaan');
    const selectedTeams = list.selectedOptions.selected.map(item => item.value);

    this.tourService.addTeams({tour: this.selectedTour, teams: selectedTeams}).subscribe(response => (console.log('hehe')));
  }

  fetchTour() {
    this.store.dispatch(new fromTour.FetchTourById(this.selectedTour.id));
  }

}
