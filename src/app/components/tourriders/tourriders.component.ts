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
  maxParticipantRiders = 2;
  maxParticipantRidersPunten = 220;
  laagsteWaardegroep = 12;

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
    this.currentRider = Object.assign(rider.rider, {waarde: rider.waarde});
    console.log(this.currentRider);
    this.currentTeam = team;
    $event.stopPropagation();
  }

  calculateUsedWaardepunten(): number {
    if (this.participantRiders && this.participantRiders.riders.length > 0) {
      return this.participantRiders.riders.reduce((acc, obj) => acc + obj.waarde, 0);
    }
  }

  participantRidersComplete(): boolean {
    return this.participantRiders &&
      this.calculateUsedWaardepunten() <= this.maxParticipantRidersPunten &&
      this.participantRiders &&
      this.participantRiders.riders.length === this.maxParticipantRiders &&
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

  showBeschermdeRennerOfMeesterknecht() {
    if (this.participantRiders && this.participantRiders.meesterknecht && this.currentRider) {
      return (this.currentRider.waarde === this.participantRiders.meesterknecht.waarde);
    }
    if (this.participantRiders && this.participantRiders.beschermdeRenner && this.currentRider) {
      return (this.currentRider.waarde === this.participantRiders.beschermdeRenner.waarde);
    }
    return true;
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
