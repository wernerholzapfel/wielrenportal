import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RiderService} from './services/rider.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared.module';
import {effects, reducers} from './store/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RidersComponent} from './components/riders/riders.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './services/auth-guard.service';
import {AppRoutes} from './app.routes';
import { HomeComponent } from './components/home/home.component';
import {TokenInterceptor} from './services/token.interceptor';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { TourridersComponent } from './components/tourriders/tourriders.component';
import {TourService} from './services/tour.service';
import { ToursetupComponent } from './components/toursetup/toursetup.component';
import {TeamService} from './services/teams.service';


@NgModule({
  declarations: [
    AppComponent,
    RidersComponent,
    LoginComponent,
    HomeComponent,
    UsermanagementComponent,
    TourridersComponent,
    ToursetupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    RiderService,
    TourService,
    AuthService,
    TeamService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
