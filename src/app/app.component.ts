import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from './store/store';
import * as fromParticipanttable from './store/participanttable/participanttable.actions';
import * as fromTour from './store/tour/tour.actions';
import {getTour, getTours, isRegistrationOpen} from './store/tour/tour.reducer';
import {Observable, Subject} from 'rxjs';
import {ITour} from './models/tour.model';
import {getLastUpdated} from './store/participanttable/participanttable.reducer';
import {MatSnackBar} from '@angular/material';
import * as fromParticipantForm from './store/participantform/participantform.actions';
import {getParticipant} from './store/participant/participant.reducer';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
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
  unsubscribe = new Subject<void>();

  ngOnInit() {
    this.setViewHeight();
    window.addEventListener('resize', () => {
      this.setViewHeight();
    });

    this.store.dispatch(new fromTour.FetchTourList);
    this.store.dispatch(new fromTour.FetchTour());

    this.isRegistrationOpen$ = this.store.pipe(select(isRegistrationOpen));
    this.store.pipe(select(getParticipant)).pipe(takeUntil(this.unsubscribe)).subscribe(participant => {
      if (participant) {
        this.displayName = participant.displayName;
      }
    });

    this.tours$ = this.store.pipe(select(getTours));

    this.tour$ = this.store.pipe(select(getTour));
    this.tour$.subscribe(tour => {
      if (tour && tour.id) {
        this.selectedTour = tour;
        console.log('tour is gewijzigd naar: ' + tour.id);
        this.store.dispatch(new fromParticipanttable.FetchParticipanttable(tour.id));
        this.store.dispatch(new fromParticipanttable.FetchLastUpdated(tour.id));
      }
    });
    this.lastUpdated$ = this.store.pipe(select(getLastUpdated));

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

  selectTour(tour: ITour) {
    this.store.dispatch(new fromTour.FetchTourById(tour.id));
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(new fromParticipantForm.ClearParticipantform());
  }

  setViewHeight() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
