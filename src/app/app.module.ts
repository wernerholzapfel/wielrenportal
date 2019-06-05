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
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './services/auth-guard.service';
import {AppRoutes} from './app.routes';
import {HomeComponent} from './components/home/home.component';
import {TokenInterceptor} from './services/token.interceptor';
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
import {AddStageClassificationsComponent} from './components/etappes/dialog/add-stage-classifications/add-stage-classifications.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import {AgGridModule} from 'ag-grid-angular';
import {ClassificationsService} from './services/stageclassifications.service';
import {ParticipanttableComponent} from './components/participanttable/participanttable.component';
import {RiderdetailsComponent} from './components/riderdetails/riderdetails.component';
import {EdittourriderdialogComponent} from './components/edittourriderdialog/edittourriderdialog.component';
import {ParticipantpredictionsComponent} from './components/participantpredictions/participantpredictions.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {SpelregelsComponent} from './components/spelregels/spelregels.component';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {CanDeactivateGuard} from './candeactivate.guard';
import {HastourendedclassComponent} from './aggridcomponents/hastourendedclass/hastourendedclass.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {EtappetableComponent} from './components/uitslagen/etappetable/etappetable.component';
import {Top5Component} from './components/top5/top5.component';
import {HeadlinesEditComponent} from './components/headlines-edit/headlines-edit.component';
import { AddHeadlineDialogComponent } from './components/headlines-edit/dialog/add-headline-dialog/add-headline-dialog.component';
import { HeadlinesComponent } from './components/headlines/headlines.component';
import {TourriderDetailComponent} from './components/tourriderdetail/tourrider-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Deelnemertop5Component } from './components/top5/deelnemertop5/deelnemertop5.component';
import { Ridertop5Component } from './components/top5/ridertop5/ridertop5.component';
import { UitslagenComponent } from './components/uitslagen/uitslagen.component';
import { ToggleuitslagenComponent } from './components/uitslagen/toggleuitslagen/toggleuitslagen.component';
import { KlassementenComponent } from './components/uitslagen/klassementen/klassementen.component';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    RidersComponent,
    LoginComponent,
    HomeComponent,
    TourridersComponent,
    ToursetupComponent,
    ParticipantsComponent,
    EtappesComponent,
    AddEtappeDialogComponent,
    AddStageClassificationsComponent,
    ParticipanttableComponent,
    TourriderDetailComponent,
    RiderdetailsComponent,
    EdittourriderdialogComponent,
    ParticipantpredictionsComponent,
    SpelregelsComponent,
    HastourendedclassComponent,
    EtappetableComponent,
    Top5Component,
    HeadlinesEditComponent,
    AddHeadlineDialogComponent,
    HeadlinesComponent,
    ProfileComponent,
    Deelnemertop5Component,
    Ridertop5Component,
    UitslagenComponent,
    ToggleuitslagenComponent,
    KlassementenComponent
  ],
  entryComponents: [
    AddEtappeDialogComponent,
    AddStageClassificationsComponent,
    EdittourriderdialogComponent,
    AddHeadlineDialogComponent
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
