import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getLastUpdated, getNumberOne, getTopX} from '../../store/participanttable/participanttable.reducer';
import {Observable} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';
import {getTour, isRegistrationOpen} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastUpdated$: Observable<any>;
  lastUpdated: string;
  isRegistrationOpen$: Observable<boolean>;
  first$: Observable<IParticipanttable>;
  tour$: Observable<ITour>;
  deadline: Date;

  constructor(public authService: AuthService, public store: Store<IAppState>) {
    moment.locale('nl');
  }

  ngOnInit() {


    this.lastUpdated$ = this.store.pipe(select(getLastUpdated));
    this.lastUpdated$.subscribe(lastupdated => {
      if (lastupdated) {
        this.lastUpdated = moment(lastupdated.lastUpdated).fromNow();
      }
    });
    this.isRegistrationOpen$ = this.store.select(isRegistrationOpen);
    this.first$ = this.store.select(getNumberOne);

    this.tour$ = this.store.select(getTour);

    this.tour$.subscribe(tour => {
      if (tour && tour.deadline) {
        this.deadline = tour.deadline;
      }
    });
  }

}
