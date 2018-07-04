import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getLastUpdated, getNumberOne} from '../../store/participanttable/participanttable.reducer';
import {Observable} from 'rxjs/Observable';
import {IParticipanttable} from '../../models/participanttable.model';
import {getTour, isRegistrationOpen} from '../../store/tour/tour.reducer';
import {ITour} from '../../models/tour.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastUpdated$: Observable<any>;
  isRegistrationOpen$: Observable<boolean>;
  first$: Observable<IParticipanttable>;
  tour$: Observable<ITour>;
  deadline: Date;

  constructor(public authService: AuthService, public store: Store<IAppState>) {
  }

  ngOnInit() {
    this.lastUpdated$ = this.store.select(getLastUpdated);
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
