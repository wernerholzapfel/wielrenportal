import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UiServiceService} from '../../../services/ui-service.service';
import {ETAPPE, KLASSEMENT} from '../../../models/constants';
import {IAppState} from '../../../store/store';
import {select, Store} from '@ngrx/store';
import {getTour} from '../../../store/tour/tour.reducer';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-toggleuitslagen',
  templateUrl: './toggleuitslagen.component.html',
  styleUrls: ['./toggleuitslagen.component.scss']
})
export class ToggleuitslagenComponent implements OnInit, OnDestroy {

  constructor(private uiService: UiServiceService, private store: Store<IAppState>) {
  }

  ETAPPE = ETAPPE;
  KLASSEMENT = KLASSEMENT;

  klassementText = 'Tussenklassementen';
  unsubscribe = new Subject<void>();
  @Input() checked: string;

  ngOnInit() {
    this.store.pipe(select(getTour)).pipe(takeUntil(this.unsubscribe)).subscribe(tour => {
      if (tour) {
        this.klassementText = tour.hasEnded ? 'Eindklassementen' : 'Tussenklassement';
      }
    });
  }

  setUitslagenType(uitslagenType) {
    this.uiService.showUitslagenType.next(uitslagenType);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
