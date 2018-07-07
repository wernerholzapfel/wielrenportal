import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import {IAppState} from './store/store';
import * as fromParticipanttable from './store/participanttable/participanttable.actions';
import * as fromTour from './store/tour/tour.actions';
import {getTour, getTours, isRegistrationOpen} from './store/tour/tour.reducer';
import {Observable} from 'rxjs/Observable';
import {ITour} from './models/tour.model';
import {getLastUpdated} from './store/participanttable/participanttable.reducer';
import {MatSnackBar} from '@angular/material';
import * as fromParticipantForm from './store/participantform/participantform.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>, public authService: AuthService, public snackBar: MatSnackBar) {
  }

  isSubmissionPossible = true;
  displayName: string;
  events: string[] = [];
  opened: boolean;
  tour$: Observable<ITour>;
  tours$: Observable<ITour[]>;
  selectedTour: ITour;
  lastUpdated$: Observable<any>;
  isRegistrationOpen$: Observable<boolean>;
  lastUpdated: any;

  ngOnInit() {
    this.store.dispatch(new fromTour.FetchTourList);
    this.store.dispatch(new fromTour.FetchTour());

    this.isRegistrationOpen$ = this.store.select(isRegistrationOpen);

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
        this.store.dispatch(new fromParticipanttable.FetchLastUpdated(tour.id));
      }
    });
    this.lastUpdated$ = this.store.select(getLastUpdated);

    this.lastUpdated$.subscribe(response => {
      if (response &&
        this.lastUpdated && response.tour === this.lastUpdated.tour &&
        response.lastUpdated !== this.lastUpdated.lastUpdated) {
        this.lastUpdated = response;
        this.snackBar.open('De stand is bijgewerkt.', '', {
          duration: 2000,
        });
      }
      this.lastUpdated = response;
    });
  }

  fetchTour() {
    this.store.dispatch(new fromTour.FetchTourById(this.selectedTour.id));
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(new fromParticipantForm.ClearParticipantform());
  }
}
