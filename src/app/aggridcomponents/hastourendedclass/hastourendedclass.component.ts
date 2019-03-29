import {Component, OnDestroy} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {getTour} from '../../store/tour/tour.reducer';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ITour} from '../../models/tour.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-hastourendedclass',
  templateUrl: './hastourendedclass.component.html',
  styleUrls: ['./hastourendedclass.component.scss']
})
export class HastourendedclassComponent implements ICellRendererAngularComp, OnDestroy {

  constructor(private store: Store<IAppState>) {
  }

  private params: any;
  public tour: ITour;
  private content: string;
  unsubscribe = new Subject<void>();

  // called on init
  agInit(params: any): void {
    this.params = params;
    this.store.select(getTour).pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
      this.tour = tour;
    });
  }

  refresh(params: any): boolean {
    return false;
  }

  public value(): string {
    this.content = this.params.value;
    return this.content;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
