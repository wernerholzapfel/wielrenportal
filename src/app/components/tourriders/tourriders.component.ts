import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import * as fromTour from '../../store/tour/tour.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour, getTourTeams, isRegistrationOpen} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {IPartipantRidersFormModel} from '../../models/partipantRidersForm.model';
import {ITeam} from '../../models/team.model';
import {map, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import {PredictionService} from '../../services/prediction.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {IPrediction, ITourrider} from '../../models/participant.model';
import {IRider} from '../../models/rider.model';
import * as moment from 'moment';
import * as fromParticipantForm from '../../store/participantform/participantform.actions';
import {AddRiderToForm} from '../../store/participantform/participantform.actions';
import {getParticipantforms} from '../../store/participantform/participantform.reducer';
import {ParticipantService} from '../../services/participant.service';

@Component({
  selector: 'app-tourriders',
  templateUrl: './tourriders.component.html',
  styleUrls: ['./tourriders.component.scss']
})
export class TourridersComponent implements OnInit, OnDestroy {

  participantId: string;
  tour$: Observable<ITour>;
  teams$: Observable<ITeam[]>;
  participantsForm$: Observable<any[]>;
  participantsFormInit$: Observable<any[]>;
  isRegistrationOpen$: Observable<boolean>;
  currentRider: any; // todo
  currentTeam: ITeam;
  partipantRidersForm: IPartipantRidersFormModel;
  maxParticipantRiders = 11;
  maxParticipantRidersPunten = 800;
  laagsteWaardegroep = 10;
  ridersWaardeList: any[] = [];
  newWaardeList: any[];
  isLoading: boolean;
  init: Subscription;
  isParticipantFormDirty: boolean;
  isRegistrationOpen: boolean;
  unsubscribe = new Subject<void>();

  constructor(private store: Store<IAppState>,
              private predictionService: PredictionService,
              public snackBar: MatSnackBar,
              private participantService: ParticipantService,
              private router: Router) {
  }

  ngOnInit() {
    this.participantsFormInit$ = this.store.select(getParticipantforms);
    this.participantsForm$ = this.store.select(getParticipantforms);

    this.participantService.getParticipant().subscribe(user => {
      console.log(user);
      this.participantId = user.id;
    });
    this.tour$ = this.store.select(getTour);
    this.teams$ = this.store.select(getTourTeams);
    this.isRegistrationOpen$ = this.store.select(isRegistrationOpen);
    this.isRegistrationOpen$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      this.isRegistrationOpen = response;
      if (this.isRegistrationOpen === true) {
        this.tour$.pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
          if (tour && tour.id) {
            this.isLoading = true;

            this.init = this.participantsFormInit$.pipe(take(2)).pipe(takeUntil(this.unsubscribe)).subscribe(initPredictions => {
              if (initPredictions.length <= 0) {
                this.store.dispatch(new fromParticipantForm.FetchParticipantform(tour.id));
              } else {
                this.partipantRidersForm = {
                  riders: initPredictions.filter(p => p.isRider),
                  beschermdeRenner: initPredictions.find(p => p.isBeschermdeRenner),
                  waterdrager: initPredictions.find(p => p.isWaterdrager),
                  linkebal: initPredictions.find(p => p.isLinkebal),
                  meesterknecht: initPredictions.find(p => p.isMeesterknecht),
                  tour: null,
                };
                initPredictions.forEach(prediction => {
                  console.log('set selected: ' + prediction.rider.id);
                  this.setCurrentRiderAsSelected(prediction.rider, prediction.rider.team, true);
                });
              }
            });
            this.participantsForm$.pipe(takeUntil(this.unsubscribe)).subscribe(predictions => {
              this.partipantRidersForm = {
                riders: predictions.filter(p => p.isRider),
                beschermdeRenner: predictions.find(p => p.isBeschermdeRenner),
                waterdrager: predictions.find(p => p.isWaterdrager),
                linkebal: predictions.find(p => p.isLinkebal),
                meesterknecht: predictions.find(p => p.isMeesterknecht),
                tour: null,
              };
            });
          }
          this.isLoading = false;
        });

        this.teams$.pipe(takeUntil(this.unsubscribe)).subscribe(teams => {
          if (teams) {
            this.ridersWaardeList = [];
            this.newWaardeList = [];

            teams.map(team => {
              console.log('team.tourRiders lengte: ' + team.tourRiders.length);
              this.ridersWaardeList = [...this.ridersWaardeList,
                ...team.tourRiders.map(rider => Object.assign(rider, {team: {id: team.id}}))];
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
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate() {
    console.log('i am navigating away');

    if (this.isParticipantFormDirty) {
      return window.confirm('Je tijdelijke team is opgeslagen maar nog niet compleet. Vergeet niet om je team later compleet te maken.');
    }

    return !this.isParticipantFormDirty;
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
    this.isParticipantFormDirty = true;
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);
    if (!this.partipantRidersForm ||
      (this.partipantRidersForm.riders && this.partipantRidersForm.riders.length < this.maxParticipantRiders)) {

      this.store.dispatch(new AddRiderToForm(Object.assign({
        rider: Object.assign(this.currentRider, {team: {id: this.currentTeam.id}}),
        isRider: true
      })));
      this.submitForm();
      console.log(this.currentRider.surName + ' toegevoegd als renner');
    }
  }

  addBeschermdeRenner() {
    this.isParticipantFormDirty = true;
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);

    this.store.dispatch(new AddRiderToForm(Object.assign({
      rider: Object.assign(this.currentRider, {team: {id: this.currentTeam.id}}),
      isBeschermdeRenner: true
    })));
    this.submitForm();

    console.log(this.currentRider.surName + ' toegevoegd als beschermderenner');
  }

  addMeesterknecht() {
    this.isParticipantFormDirty = true;
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);

    this.store.dispatch(new AddRiderToForm(Object.assign({
      rider: Object.assign(this.currentRider, {team: {id: this.currentTeam.id}}),
      isMeesterknecht: true
    })));
    this.submitForm();
    console.log(this.currentRider.surName + ' toegevoegd als meesterknecht');
  }

  addLinkebal() {
    this.isParticipantFormDirty = true;
    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);

    this.store.dispatch(new AddRiderToForm(Object.assign({
      rider: Object.assign(this.currentRider, {team: {id: this.currentTeam.id}}),
      isLinkebal: true
    })));
    this.submitForm();

    console.log(this.currentRider.surName + ' toegevoegd als joker');
  }

  addWaterdrager() {
    this.isParticipantFormDirty = true;

    this.setCurrentRiderAsSelected(this.currentRider, this.currentTeam, true);

    this.store.dispatch(new AddRiderToForm(Object.assign({
      rider: Object.assign(this.currentRider, {team: {id: this.currentTeam.id}}),
      isWaterdrager: true
    })));
    this.submitForm();

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
    // update the store
    this.store.dispatch(new fromParticipantForm.DeleteRiderFromForm(Object.assign(prediction)));
    this.setCurrentRiderAsSelected(prediction.rider, prediction.rider.team, false);
    this.isParticipantFormDirty = true;

    this.submitForm();

  }

  submitForm() {
    const item: Element = document.querySelector('#voorspellings_kaart');
    item.scrollIntoView();
    const isComplete: boolean = this.participantRidersComplete();
    this.tour$.pipe(take(1)).subscribe(tour => {
      this.partipantRidersForm.tour = tour;
      if (this.partipantRidersForm.waterdrager) {
        this.partipantRidersForm.waterdrager.isComplete = isComplete;
      }

      if (this.partipantRidersForm.meesterknecht) {
        this.partipantRidersForm.meesterknecht.isComplete = isComplete;
      }
      if (this.partipantRidersForm.linkebal) {
        this.partipantRidersForm.linkebal.isComplete = isComplete;
      }

      if (this.partipantRidersForm.beschermdeRenner) {
        this.partipantRidersForm.beschermdeRenner.isComplete = isComplete;
      }

      this.partipantRidersForm.riders.map(rider => rider.isComplete = isComplete);

      this.predictionService.submitPrediction(this.partipantRidersForm).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        if (isComplete) {
          this.snackBar.open('Je team is compleet en opgeslagen!', '', {
            duration: 2000,
          });
          this.isParticipantFormDirty = false;
          console.log('opslaan gelukt');
        }
      }, error => {
        if (error.error.statusCode === 403) {
          this.snackBar.open(error.error.message, '', {
            duration: 4000,
          });
        } else {
          this.snackBar.open('Het opslaan is niet gelukt', '', {
            duration: 3000,
          });
        }
        console.log(error);
      });
    });
  }

  setCurrentRiderAsSelected(ridertje: ITourrider, teampje: ITeam, selected: boolean) {
    this.store.dispatch(new fromTour.SetCurrentRiderAsSelected({rider: ridertje, team: teampje, selected: selected}));
  }

  youngster(rider: IRider) {
    return moment(rider.dateOfBirth).isSameOrAfter('1994-01-01');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
