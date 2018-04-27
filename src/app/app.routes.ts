import {RouterModule, Routes} from '@angular/router';


import {AuthGuardService} from './services/auth-guard.service';
import {RidersComponent} from './components/riders/riders.component';
import {HomeComponent} from './components/home/home.component';
import {UsermanagementComponent} from './components/usermanagement/usermanagement.component';
import {TourridersComponent} from './components/tourriders/tourriders.component';
import {LoginComponent} from './components/login/login.component';

const appRoutes: Routes = [
  {
    path: 'riders',
    canActivate: [AuthGuardService],
    component: RidersComponent
  },
  {
    path: 'tourriders',
    component: TourridersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes,
  {enableTracing: false});
