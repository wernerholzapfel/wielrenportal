import {RouterModule, Routes} from '@angular/router';


import {AuthGuardService} from './services/auth-guard.service';
import {RidersComponent} from './components/riders/riders.component';
import {HomeComponent} from './components/home/home.component';
import {TourridersComponent} from './components/tourriders/tourriders.component';
import {LoginComponent} from './components/login/login.component';
import {ToursetupComponent} from './components/toursetup/toursetup.component';
import {AdminGuardService} from './services/admin-guard.service';
import {ParticipantsComponent} from './components/participants/participants.component';

const appRoutes: Routes = [
  {
    path: 'riders',
    component: RidersComponent
  },
  {
    path: 'tourriders',
    canActivate: [AuthGuardService],
    component: TourridersComponent
  },{
    path: 'participants',
    component: ParticipantsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'admin',
    canActivate: [AdminGuardService],
    component: ToursetupComponent
  },
  {
    path: '',
    component: HomeComponent,
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes,
  {enableTracing: false});
