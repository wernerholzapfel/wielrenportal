import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {getParticipantPredictions, getTopX} from '../../store/participanttable/participanttable.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {Observable, of, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {getParticipant} from '../../store/participant/participant.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit, OnDestroy {

  constructor(public store: Store<IAppState>) {
  }

  top = 5;
  unsubscribe = new Subject<void>();
  @Input() lastUpdated: string;
  @Input() isRegistrationOpen$: Observable<boolean>;
  stand$: Observable<IParticipanttable[]>;
  participantPrediction: IParticipanttable;

  ngOnInit() {
    this.stand$ = this.store.select(getTopX(this.top));

    this.store.select(getParticipant)
      .pipe(takeUntil(this.unsubscribe), switchMap(participant => {
      return participant ? of(participant.id) : of(null);
    }))
      .pipe(switchMap(participantId => {
        return participantId ? this.store.select(getParticipantPredictions(participantId)) : of(null);
      }))
      .subscribe(participantPredictions => {
      if (participantPredictions) {
        this.participantPrediction = participantPredictions;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
