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
import {PredictionService} from '../../services/prediction.service';

@Component({
  selector: 'app-tourriders',
  templateUrl: './tourriders.component.html',
  styleUrls: ['./tourriders.component.scss']
})
export class TourridersComponent implements OnInit {
  tour$: Observable<ITour>;
  currentRider: IRider;
  currentTeam: ITeam;
  partipantRidersForm: IPartipantRidersFormModel;
  maxParticipantRiders = 16;
  maxParticipantRidersPunten = 1060;
  laagsteWaardegroep = 10;

  constructor(private store: Store<IAppState>, private predictionService: PredictionService) {
  }

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTour());
    this.tour$ = this.store.select(getTour);

    this.partipantRidersForm = {
      riders: [],
      beschermdeRenner: null,
      waterdrager: null,
      linkebal: null,
      meesterknecht: null,
      tour: null,
    };
  }

  setCurrentRider(rider, team, $event) {
    this.currentRider = Object.assign(rider.rider, {waarde: rider.waarde});
    console.log(this.currentRider);
    this.currentTeam = team;
    $event.stopPropagation();
  }

  calculateUsedWaardepunten(): number {
    if (this.partipantRidersForm && this.partipantRidersForm.riders.length > 0) {
      return this.partipantRidersForm.riders.reduce((acc, obj) => acc + obj.waarde, 0);
    }
  }

  participantRidersComplete(): boolean {
    return this.partipantRidersForm &&
      this.calculateUsedWaardepunten() <= this.maxParticipantRidersPunten &&
      this.partipantRidersForm &&
      this.partipantRidersForm.riders.length === this.maxParticipantRiders &&
      !!this.partipantRidersForm.meesterknecht &&
      !!this.partipantRidersForm.linkebal &&
      !!this.partipantRidersForm.waterdrager &&
      !!this.partipantRidersForm.beschermdeRenner;
  }

  addRenner() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    if (this.partipantRidersForm.riders.length < this.maxParticipantRiders) {
      this.partipantRidersForm.riders = [...this.partipantRidersForm.riders, Object.assign(this.currentRider, {isRenner: true})];
      console.log(this.currentRider.surName + ' toegevoegd als renner');
    }
  }

  addBeschermdeRenner() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.partipantRidersForm.beschermdeRenner = Object.assign(this.currentRider, {isBeschermdeRenner: true});
    console.log(this.currentRider.surName + ' toegevoegd als beschermderenner');
  }

  addMeesterknecht() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.partipantRidersForm.meesterknecht = Object.assign(this.currentRider, {isMeesterknecht: true});
    console.log(this.currentRider.surName + ' toegevoegd als meesterknecht');
  }

  addLinkebal() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.partipantRidersForm.linkebal = Object.assign(this.currentRider, {isLinkebal: true});
    console.log(this.currentRider.surName + ' toegevoegd als linkebal');
  }

  addWaterdrager() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam);
    this.partipantRidersForm.waterdrager = Object.assign(this.currentRider, {isWaterdrager: true});
    console.log(this.currentRider.surName + ' toegevoegd als waterdrager'
    );
  }

  showBeschermdeRennerOfMeesterknecht() {
    if (this.partipantRidersForm && this.partipantRidersForm.meesterknecht && this.currentRider) {
      return (this.currentRider.waarde === this.partipantRidersForm.meesterknecht.waarde);
    }
    if (this.partipantRidersForm && this.partipantRidersForm.beschermdeRenner && this.currentRider) {
      return (this.currentRider.waarde === this.partipantRidersForm.beschermdeRenner.waarde);
    }
    return true;
  }

  submitForm() {
    this.tour$.take(1).subscribe(tour => {
      this.partipantRidersForm.tour = tour;

      this.predictionService.submitPrediction(this.partipantRidersForm).subscribe(response =>
        console.log('opslaan gelukt'), error => console.log(error));
    });
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
