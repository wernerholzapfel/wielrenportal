import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHeadline} from '../../models/headline.model';
import {HeadlinesService} from '../../services/headlines.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour} from '../../store/tour/tour.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {ITour} from '../../models/tour.model';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();

  headline: IHeadline;
  headlineIndex = 0;
  headlines: IHeadline[];
  numberOfHeadlines = 1;
  tour$: Observable<ITour>;

  constructor(private headlineService: HeadlinesService, private store: Store<IAppState>) {
  }

  ngOnInit() {

    this.tour$ = this.store.pipe(select(getTour));

    this.tour$.pipe(switchMap(tour => {
      return tour ? of(tour.id) : of(null);
    }))
      .pipe(switchMap(tourId => {
        return tourId ? this.headlineService.getHeadlines(tourId) : of(null);
      }))
      .pipe(takeUntil(this.unsubscribe)).subscribe(headlines => {
        if (headlines) {
          this.headlines = headlines;
          this.headline = headlines[this.headlineIndex];
        }
      }
    );
  }

  nextHeadline() {
    this.headlineIndex++;
    this.headline = this.headlines[this.headlineIndex];
  }

  previousHeadline() {
    this.headlineIndex--;
    this.headline = this.headlines[this.headlineIndex];
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
