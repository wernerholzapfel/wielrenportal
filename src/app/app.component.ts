import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import {IAppState} from './store/store';
import * as fromParticipanttable from './store/participanttable/participanttable.actions';
import * as fromTour from './store/tour/tour.actions';
import {getTour, getTourId, getTours} from './store/tour/tour.reducer';
import {Observable} from 'rxjs/Observable';
import {ITour} from './models/tour.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>, public authService: AuthService) {
  }

  isSubmissionPossible = true;
  displayName: string;
  events: string[] = [];
  opened: boolean;
  tour$: Observable<ITour>;
  tours$: Observable<ITour[]>;
  selectedTour: ITour;

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTourList);
    this.store.dispatch(new fromTour.FetchTour());

    this.tours$ = this.store.select(getTours);
    this.tours$.subscribe(tours => {
      if (tours && tours.length > 0) {
        this.selectedTour = tours.find(tour => tour.isActive);
      }
    });

    this.tour$ = this.store.select(getTour);
    this.tour$.subscribe(tour => {
      if (tour) {
        console.log('tour is gewijzigd naar: ' + tour.id);
        this.store.dispatch(new fromParticipanttable.FetchParticipanttable(tour.id));
      }
    });

  }

  fetchTour() {
    this.store.dispatch(new fromTour.FetchTourById(this.selectedTour.id));
  }

  logout() {
    this.authService.logout();
  }
}
