import {Component, OnInit} from '@angular/core';
import * as fromTour from '../../store/tour/tour.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {IRider} from '../../models/rider.model';
import {IPartipantRidersFormModel} from '../../models/partipantRidersForm.model';
import {ITeam} from '../../models/team.model';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-tourriders',
  templateUrl: './tourriders.component.html',
  styleUrls: ['./tourriders.component.scss']
})
export class TourridersComponent implements OnInit {
  tour$: Observable<ITour>;
  currentRider: IRider;
  currentTeam: ITeam;
  participantRiders: IPartipantRidersFormModel;
  maxParticipantRiders = 16;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTour());
    this.tour$ = this.store.select(getTour);

    this.participantRiders = {
      riders: [],
      beschermdeRenner: null,
      waterdrager: null,
      linkebal: null,
      meesterknecht: null
    };
  }

  setCurrentRider(rider, team, $event) {
    this.currentRider = rider;
    this.currentTeam = team;
    $event.stopPropagation();
  }

  participantRidersComplete(): boolean {
    return this.participantRiders &&
      this.participantRiders.riders.length === 1 &&
    !!this.participantRiders.meesterknecht &&
    !!this.participantRiders.linkebal &&
    !!this.participantRiders.waterdrager &&
    !!this.participantRiders.beschermdeRenner;
  }

  addRenner() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    if (this.participantRiders.riders.length < this.maxParticipantRiders) {
      this.participantRiders.riders = [...this.participantRiders.riders, this.currentRider];
      console.log(this.currentRider.surName + ' toegevoegd als renner');
    }
  }

  addBeschermdeRenner() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.participantRiders.beschermdeRenner = this.currentRider;
    console.log(this.currentRider.surName + ' toegevoegd als beschermderenner');
  }

  addMeesterknecht() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.participantRiders.meesterknecht = this.currentRider;
    console.log(this.currentRider.surName + ' toegevoegd als meesterknecht');
  }

  addLinkebal() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.participantRiders.linkebal = this.currentRider;
    console.log(this.currentRider.surName + ' toegevoegd als linkebal');
  }

  addWaterdrager() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.participantRiders.waterdrager = this.currentRider;
    console.log(this.currentRider.surName + ' toegevoegd als waterdrager'
    );
  }

  setCurrentRiderAsSelected(ridertje: IRider, teampje: ITeam) {
    this.tour$.take(1).subscribe(response => {
      response.teams.forEach(team => {
        if (team.id === teampje.id) {
          team.tourRiders.forEach(rider => {
            if (rider.rider.id === ridertje.id) {
              Object.assign(rider.rider, {isSelected: true});
            }
          });
        }
      });
      this.store.dispatch(new fromTour.SetCurrentRiderAsSelected(response));
    });
  }
}
