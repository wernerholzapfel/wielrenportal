import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHeadline} from '../../models/headline.model';
import {HeadlinesService} from '../../services/headlines.service';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getTour} from '../../store/tour/tour.reducer';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ITour} from '../../models/tour.model';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();

  headlines: IHeadline[];
  numberOfHeadlines = 3;
  tour$: Observable<ITour>;

  constructor(private headlineService: HeadlinesService, private store: Store<IAppState>) {
  }

  ngOnInit() {

    this.tour$ = this.store.pipe(select(getTour));

    this.tour$.pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
      this.headlineService.getHeadlines(tour.id).subscribe(headlines => {
          if (headlines) {
            this.headlines = headlines;
          }
        }
      );
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
