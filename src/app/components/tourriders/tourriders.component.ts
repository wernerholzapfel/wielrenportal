import {Component, OnInit} from '@angular/core';
import * as fromTour from '../../store/tour/tour.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour, getTourTeams} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {IPartipantRidersFormModel} from '../../models/partipantRidersForm.model';
import {ITeam} from '../../models/team.model';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {PredictionService} from '../../services/prediction.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {IPrediction, ITourrider} from '../../models/participant.model';
import {IRider} from '../../models/rider.model';
import * as moment from 'moment';

@Component({
  selector: 'app-tourriders',
  templateUrl: './tourriders.component.html',
  styleUrls: ['./tourriders.component.scss']
})
export class TourridersComponent implements OnInit {
  tour$: Observable<ITour>;
  teams$: Observable<ITeam[]>;
  currentRider: any; // todo
  currentTeam: ITeam;
  partipantRidersForm: IPartipantRidersFormModel;
  maxParticipantRiders = 16;
  maxParticipantRidersPunten = 1060;
  laagsteWaardegroep = 10;
  ridersWaardeList: any[] = [];
  newWaardeList: any[];
  isLoading: boolean;

  constructor(private store: Store<IAppState>,
              private predictionService: PredictionService,
              public snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {

    this.tour$ = this.store.select(getTour);
    this.teams$ = this.store.select(getTourTeams);

    this.tour$.subscribe(tour => {
      if (tour.id) {
        this.isLoading = true;

        this.predictionService.getPredictionsForUser(tour.id).subscribe(predictions => {
          this.partipantRidersForm = {
            riders: predictions.filter(p => p.isRider),
            beschermdeRenner: predictions.find(p => p.isBeschermdeRenner),
            waterdrager: predictions.find(p => p.isWaterdrager),
            linkebal: predictions.find(p => p.isLinkebal),
            meesterknecht: predictions.find(p => p.isMeesterknecht),
            tour: null,
          };

          predictions.forEach(prediction => {
            this.setCurrentRiderAsSelected(prediction.rider, prediction.rider.team, true);
          });
        });
      }
      this.isLoading = false;
    });

    this.teams$.subscribe(teams => {
      if (teams) {
        this.ridersWaardeList = [];
        this.newWaardeList = [];

        teams.map(team => {
          console.log('team.tourRiders lengte: ' + team.tourRiders.length);
          this.ridersWaardeList = [...this.ridersWaardeList, ...team.tourRiders];
        });
      }

      const mapList = {};
      this.ridersWaardeList.forEach(item => {
        const k = item.waarde;
        mapList[k] = mapList[k] || [];
        mapList[k].push(item);
      });

      this.newWaardeList = Object.keys(mapList).map(k => ({key: k, data: mapList[k]}));

      this.newWaardeList.sort((a, b) => b.key - a.key);
    });
  }

  setCurrentRider(rider, team, $event) {
    this.currentRider = Object.assign(rider);
    console.log(this.currentRider);
    this.currentTeam = team;
    $event.stopPropagation();
  }

  calculateUsedWaardepunten(): number {
    if (this.partipantRidersForm && this.partipantRidersForm.riders.length > 0) {
      return this.partipantRidersForm.riders.reduce((acc, obj) => acc + obj.rider.waarde, 0);
    } else {
      return 0;
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
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    if (this.partipantRidersForm.riders.length < this.maxParticipantRiders) {
      this.partipantRidersForm.riders = [...this.partipantRidersForm.riders,
        Object.assign({
          rider: Object.assign(this.currentRider, {team: this.currentTeam}),
          isRider: true
        })];
      console.log(this.currentRider.surName + ' toegevoegd als renner');
    }
  }

  addBeschermdeRenner() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.beschermdeRenner = Object.assign({
      rider: Object.assign(this.currentRider, {team: this.currentTeam}),
      isBeschermdeRenner: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als beschermderenner');
  }

  addMeesterknecht() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.meesterknecht = Object.assign({
      rider: Object.assign(this.currentRider, {team: this.currentTeam}),
      isMeesterknecht: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als meesterknecht');
  }

  addLinkebal() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.linkebal = Object.assign({
      rider: Object.assign(this.currentRider, {team: this.currentTeam}),
      isLinkebal: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als linkebal');
  }

  addWaterdrager() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.waterdrager = Object.assign({
      rider: Object.assign(this.currentRider, {team: this.currentTeam}),
      isWaterdrager: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als waterdrager'
    );
  }

  showBeschermdeRennerOfMeesterknecht() {
    if (this.partipantRidersForm && this.partipantRidersForm.meesterknecht && this.currentRider) {
      return (this.currentRider.waarde === this.partipantRidersForm.meesterknecht.rider.waarde);
    }
    if (this.partipantRidersForm && this.partipantRidersForm.beschermdeRenner && this.currentRider) {
      return (this.currentRider.waarde === this.partipantRidersForm.beschermdeRenner.rider.waarde);
    }
    return true;
  }

  deleteRider(prediction: IPrediction) {
    if (prediction.isRider) {
      this.partipantRidersForm.riders = [...this.partipantRidersForm.riders].filter(item => item.rider.id !== prediction.rider.id);
    }
    if (prediction.isMeesterknecht) {
      this.partipantRidersForm.meesterknecht = null;
    }
    if (prediction.isLinkebal) {
      this.partipantRidersForm.linkebal = null;
    }
    if (prediction.isWaterdrager) {
      this.partipantRidersForm.waterdrager = null;
    }
    if (prediction.isBeschermdeRenner) {
      this.partipantRidersForm.beschermdeRenner = null;
    }
    this.setCurrentRiderAsSelected(prediction.rider, prediction.rider.team, false);
  }

  submitForm() {
    this.tour$.take(1).subscribe(tour => {
      this.partipantRidersForm.tour = tour;

      this.predictionService.submitPrediction(this.partipantRidersForm).subscribe(response => {
        this.snackBar.open('Het opslaan is gelukt', '', {
          duration: 2000,
        });
        console.log('opslaan gelukt');
        // this.router.navigate(['/participants']);
      }, error => {
        this.snackBar.open('Het opslaan is niet gelukt', '', {
          duration: 2000,
        });
        console.log(error);
      });
    });
  }

  setCurrentRiderAsSelected(ridertje: ITourrider, teampje: ITeam, selected: boolean) {
    this.store.dispatch(new fromTour.SetCurrentRiderAsSelected({rider: ridertje, team: teampje, selected: selected}));
  }

  youngster(rider: IRider) {
    return moment(rider.dateOfBirth).isAfter('1993-01-01');
  }
}
