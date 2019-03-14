import {Component, Input, OnInit} from '@angular/core';
import {getTopX} from '../../store/participanttable/participanttable.reducer';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {Observable} from 'rxjs';
import {IParticipanttable} from '../../models/participanttable.model';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit {
  top = 5;

  constructor(public store: Store<IAppState>) {
  }

  @Input() isRegistrationOpen$: Observable<boolean>;
  stand$: Observable<IParticipanttable[]>;

  ngOnInit() {
    this.stand$ = this.store.select(getTopX(this.top));
  }
}
