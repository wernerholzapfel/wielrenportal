import {Component, OnInit} from '@angular/core';
import * as fromTour from '../../store/tour/tour.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour} from '../../store/tour/tour.reducer';
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
  currentRider: any; // todo
  currentTeam: ITeam;
  partipantRidersForm: IPartipantRidersFormModel;
  maxParticipantRiders = 16;
  maxParticipantRidersPunten = 1060;
  laagsteWaardegroep = 10;
  ridersWaardeList: ITourrider[] = [];
  newWaardeList: any[];


  constructor(private store: Store<IAppState>,
              private predictionService: PredictionService,
              public snackBar: MatSnackBar,
              private router: Router) {

    Object.defineProperty(Array.prototype, 'group', {
      enumerable: false,
      value: function (key) {
        let map = {};
        this.forEach(function (e) {
          let k = key(e);
          map[k] = map[k] || [];
          map[k].push(e);
        });
        return Object.keys(map).map(function (k) {
          return {key: k, data: map[k]};
        });
      }
    });

  }

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTour());
    this.tour$ = this.store.select(getTour);

    this.tour$.subscribe(tour => {
      this.ridersWaardeList = [];
      this.newWaardeList = [];
      if (tour && tour.teams) {
        tour.teams.map(team => {
          this.ridersWaardeList = [...this.ridersWaardeList, ...team.tourRiders];
        });
      }
      this.newWaardeList = this.ridersWaardeList.group(function (item) {
        return item.waarde;
      }).sort((a, b) =>  b.key - a.key);
    });

    this.predictionService.getPredictionsForUser().subscribe(predictions => {

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
          rider: this.currentRider,
          isRider: true
        })];
      console.log(this.currentRider.surName + ' toegevoegd als renner');
    }
  }

  addBeschermdeRenner() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.beschermdeRenner = Object.assign({
      rider: this.currentRider,
      isBeschermdeRenner: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als beschermderenner');
  }

  addMeesterknecht() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.meesterknecht = Object.assign({
      rider: this.currentRider,
      isMeesterknecht: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als meesterknecht');
  }

  addLinkebal() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.linkebal = Object.assign({
      rider: this.currentRider,
      isLinkebal: true
    });
    console.log(this.currentRider.surName + ' toegevoegd als linkebal');
  }

  addWaterdrager() {
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    this.partipantRidersForm.waterdrager = Object.assign({
      rider: this.currentRider,
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
