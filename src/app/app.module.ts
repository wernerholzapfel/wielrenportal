import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


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
import { AngularFireModule } from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './services/auth-guard.service';
import {AppRoutes} from './app.routes';
import {HomeComponent} from './components/home/home.component';
import {TokenInterceptor} from './services/token.interceptor';
import {UsermanagementComponent} from './components/usermanagement/usermanagement.component';
import {TourridersComponent} from './components/tourriders/tourriders.component';
import {TourService} from './services/tour.service';
import {ToursetupComponent} from './components/toursetup/toursetup.component';
import {TeamService} from './services/teams.service';
import {PredictionService} from './services/prediction.service';
import {AdminGuardService} from './services/admin-guard.service';
import {ParticipantsComponent} from './components/participants/participants.component';
import {ParticipantService} from './services/participant.service';
import {EtappesComponent} from './components/etappes/etappes.component';
import {EtappeService} from './services/etappe.service';
import {AddEtappeDialogComponent} from './components/etappes/dialog/add-etappe-dialog/add-etappe-dialog.component';
import {OrderModule} from 'ngx-order-pipe';
import { AddStageClassificationsComponent } from './components/etappes/dialog/add-stage-classifications/add-stage-classifications.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import {AgGridModule} from 'ag-grid-angular';
import {ClassificationsService} from './services/stageclassifications.service';
import { ParticipanttableComponent } from './components/participanttable/participanttable.component';
import { TourriderdetaildialogComponent } from './components/tourriderdetaildialog/tourriderdetaildialog.component';
import { RiderdetailsComponent } from './components/riderdetails/riderdetails.component';
import { EdittourriderdialogComponent } from './components/edittourriderdialog/edittourriderdialog.component';
import { ParticipantpredictionsComponent } from './components/participantpredictions/participantpredictions.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { SpelregelsComponent } from './components/spelregels/spelregels.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {CanDeactivateGuard} from './candeactivate.guard';
import { HastourendedclassComponent } from './aggridcomponents/hastourendedclass/hastourendedclass.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { EtappetableComponent } from './etappetable/etappetable.component';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    RidersComponent,
    LoginComponent,
    HomeComponent,
    UsermanagementComponent,
    TourridersComponent,
    ToursetupComponent,
    ParticipantsComponent,
    EtappesComponent,
    AddEtappeDialogComponent,
    AddStageClassificationsComponent,
    ParticipanttableComponent,
    TourriderdetaildialogComponent,
    RiderdetailsComponent,
    EdittourriderdialogComponent,
    ParticipantpredictionsComponent,
    SpelregelsComponent,
    HastourendedclassComponent,
    EtappetableComponent
  ],
  entryComponents: [
    AddEtappeDialogComponent,
    AddStageClassificationsComponent,
    TourriderdetaildialogComponent,
    EdittourriderdialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OrderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    Ng2SearchPipeModule,
    AgGridModule.withComponents([HastourendedclassComponent]),
  ],
  providers: [
    RiderService,
    TourService,
    AuthService,
    TeamService,
    PredictionService,
    AuthGuardService,
    AdminGuardService,
    ParticipantService,
    EtappeService,
    ClassificationsService,
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    {provide: LOCALE_ID, useValue: 'nl-NL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
