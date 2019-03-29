import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiServiceService} from '../../services/ui-service.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ETAPPE, KLASSEMENT} from '../../models/constants';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-uitslagen',
  templateUrl: './uitslagen.component.html',
  styleUrls: ['./uitslagen.component.scss']
})
export class UitslagenComponent implements OnInit, OnDestroy {

  constructor(private uiService: UiServiceService, private route: ActivatedRoute) {
  }

  ETAPPE = ETAPPE;
  KLASSEMENT = KLASSEMENT;
  routeParams$: Observable<any>;

  unsubscribe = new Subject<void>();
  uitslagenType: string;

  ngOnInit() {
    this.routeParams$ = this.route.params;

    this.routeParams$.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
      if (params && params['id']) {
        this.uiService.showUitslagenType.next(ETAPPE);
      }
    });


    this.uiService.showUitslagenType.pipe(takeUntil(this.unsubscribe)).subscribe(response => this.uitslagenType = response);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();

  }
}
