import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {getParticipantPredictions, getTopX} from '../../store/participanttable/participanttable.reducer';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {Observable, of, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {getParticipant} from '../../store/participant/participant.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {getRennerTopX, getWaterdragerTopX} from '../../store/tourriders/tourrider.reducer';
import {IRider} from '../../models/rider.model';
import {getTour} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import {CalculatieService} from '../../services/calculatie.service';
import {EtappeService} from '../../services/etappe.service';
import {getLatestEtappeParticipantScore, getLatestEtappeTopX} from '../../store/etappe/etappe.reducer';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit, OnDestroy {

  constructor(public store: Store<IAppState>, private calculatieService: CalculatieService, private etappeService: EtappeService) {
  }

  top = 5;
  tour: ITour;
  unsubscribe = new Subject<void>();
  @Input() lastUpdated: string;
  @Input() isRegistrationOpen$: Observable<boolean>;
  stand$: Observable<IParticipanttable[]>;
  etappeStand$: Observable<IParticipanttable[]>;
  waterdragerTop: IRider[];
  riderTop: any[];
  latestParticipantTotalScore: IParticipanttable;
  latestEtappeParticipantScore: IParticipanttable;

  ngOnInit() {
    this.stand$ = this.store.select(getTopX(this.top));

    // get waterdragertop
    this.store.pipe(select(getTour), switchMap(tour => {
      if (tour) {
        this.tour = tour;
        return this.store.select(getWaterdragerTopX(this.top, tour.hasEnded));
      } else {
        return of([]);
      }
    })).pipe(takeUntil(this.unsubscribe)).subscribe(waterdragers => {
      this.waterdragerTop = [...waterdragers].map(waterdrager => {
        return Object.assign(waterdrager,
          {top5punten: this.tour.hasEnded ? waterdrager.waterdragerTotalPoints : waterdrager.waterdragerEtappePoints});
      });
    });

    // get ridertop
    this.store.pipe(select(getTour), switchMap(tour => {
      if (tour) {
        return this.store.select(getRennerTopX(this.top, tour.hasEnded));
      } else {
        return of(undefined);
      }
    })).pipe(takeUntil(this.unsubscribe)).subscribe(renners => {
      if (renners) {
        this.riderTop = [...renners].map(renner => {
          return Object.assign(renner,
            {top5punten: this.calculatieService.determineTotaalpunten(renner, this.tour)});
        });
      }
    });

    this.etappeStand$ = this.store.pipe(select(getTour), switchMap(tour => {
      if (tour && tour.id) {
        return this.store.select(getLatestEtappeTopX(this.top));
      } else {
        return of([]);
      }
    }));


    this.store.select(getParticipant)
      .pipe(takeUntil(this.unsubscribe), switchMap(participant => {
        return participant ? of(participant.id) : of(null);
      }))
      .pipe(switchMap(participantId => {
        return participantId ? this.store.pipe(select(getParticipantPredictions(participantId))) : of(null);
      }), takeUntil(this.unsubscribe))
      .subscribe(predictions => {
        if (predictions) {
          // console.log('participantPredictions');
          // console.log(predictions);
          this.latestParticipantTotalScore = predictions;
        }
      });

    this.store.select(getParticipant)
      .pipe(takeUntil(this.unsubscribe), switchMap(participant => {
        return participant ? of(participant.id) : of(null);
      }))
      .pipe(switchMap(participantId => {
        return participantId ? this.store.pipe(select(getLatestEtappeParticipantScore(participantId))) : of(null);
      }), takeUntil(this.unsubscribe))
      .subscribe(predictions => {
        if (predictions) {
          // console.log('etappe predictions');
          // console.log(predictions);
          this.latestEtappeParticipantScore = predictions;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
