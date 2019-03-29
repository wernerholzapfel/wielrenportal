import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';
import {getTour} from '../../store/tour/tour.reducer';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {of, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {

  participants: IParticipant[];
  unsubscribe = new Subject<void>();

  constructor(private participantService: ParticipantService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(getTour))
      .pipe(switchMap(tour => {
        if (tour && tour.id) {
          return this.participantService.getParticipants(tour.id);
        } else {
          return of(undefined);
        }
      })).pipe(takeUntil(this.unsubscribe)).subscribe(participantsResponse => {
      if (participantsResponse) {
        this.participants = participantsResponse.map(item => item);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
