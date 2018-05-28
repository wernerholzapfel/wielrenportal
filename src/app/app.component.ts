import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  isSubmissionPossible = false;
  displayName: string;
  events: string[] = [];
  opened: boolean;

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
