import {RouterModule, Routes} from '@angular/router';


import {AuthGuardService} from './services/auth-guard.service';
import {RidersComponent} from './components/riders/riders.component';
import {HomeComponent} from './components/home/home.component';
import {TourridersComponent} from './components/tourriders/tourriders.component';
import {LoginComponent} from './components/login/login.component';
import {ToursetupComponent} from './components/toursetup/toursetup.component';
import {AdminGuardService} from './services/admin-guard.service';
import {ParticipantsComponent} from './components/participants/participants.component';
import {ParticipanttableComponent} from './components/participanttable/participanttable.component';
import {RiderdetailsComponent} from './components/riderdetails/riderdetails.component';
import {ParticipantpredictionsComponent} from './components/participantpredictions/participantpredictions.component';
import {SpelregelsComponent} from './components/spelregels/spelregels.component';

const appRoutes: Routes = [
  {
    path: 'riders',
    component: RidersComponent
  }, {
    path: 'inschrijven',
    canActivate: [AuthGuardService],
    component: TourridersComponent
  }, {
    path: 'tourriders',
    component: RiderdetailsComponent
  }, {
    path: 'spelregels',
    component: SpelregelsComponent
  }, {
    path: 'participants',
    component: ParticipantsComponent
  }, {
    path: 'table',
    component: ParticipanttableComponent,
  }, {
    path: 'table/detail/:id',
    component: ParticipantpredictionsComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'admin',
    canActivate: [AdminGuardService],
    component: ToursetupComponent
  }, {
    path: '',
    component: HomeComponent,
  }, {
    path: '**',
    component: HomeComponent,
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes,
  {enableTracing: false});
