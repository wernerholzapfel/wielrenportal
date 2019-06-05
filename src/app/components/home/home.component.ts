import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated, getNumberOne} from '../../store/participanttable/participanttable.reducer';
import {Observable, Subject} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {getTour, isRegistrationOpen} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  lastUpdated$: Observable<any>;
  lastUpdated: string;
  isRegistrationOpen$: Observable<boolean>;
  first$: Observable<IParticipanttable>;
  tour$: Observable<ITour>;
  deadline: Date;
  unsubscribe = new Subject<void>();

  constructor(public authService: AuthService, public store: Store<IAppState>) {
    moment.locale('nl');
  }

  ngOnInit() {


    this.lastUpdated$ = this.store.pipe(select(getLastUpdated));
    this.lastUpdated$.pipe(takeUntil(this.unsubscribe)).subscribe(lastupdated => {
      if (lastupdated) {
        this.lastUpdated = moment(lastupdated.lastUpdated).fromNow();
      }
    });
    this.isRegistrationOpen$ = this.store.select(isRegistrationOpen);
    this.first$ = this.store.select(getNumberOne);

    this.tour$ = this.store.select(getTour);

    this.tour$.pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
      if (tour && tour.deadline) {
        this.deadline = tour.deadline;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
