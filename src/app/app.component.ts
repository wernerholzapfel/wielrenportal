import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import {IAppState} from './store/store';
import * as fromParticipanttable from './store/participanttable/participanttable.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>, public authService: AuthService) {
  }

  isSubmissionPossible = false;
  displayName: string;
  events: string[] = [];
  opened: boolean;

  ngOnInit() {
    this.store.dispatch(new fromParticipanttable.FetchParticipanttable());
  }

  logout() {
    this.authService.logout();
  }
}
