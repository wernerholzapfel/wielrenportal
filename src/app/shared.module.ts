// Angular Stuff
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
export const ANGULAR_COMMON_MODULES = [RouterModule, CommonModule, FormsModule, ReactiveFormsModule];

// Material modules
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatLineModule,
  MatCommonModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatMenuModule,
  MatPaginatorModule
} from '@angular/material';
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
export const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatLineModule,
  MatCommonModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  CdkTableModule,
  MatTableModule,
  MatMenuModule,
  MatPaginatorModule
];

// // Other utility shared modules
import { FlexLayoutModule } from '@angular/flex-layout';
export const UTILITY_SHARED_MODULES = [FlexLayoutModule];


// App Pipes
// import { FormatDatePipe } from './pipes/format-date/format-date.pipe';
// import { SearchFilterPipe } from './pipes/search-filter/search-filter.pipe';
// import { KeysPipe } from './pipes/keys/keys.pipe';
// import { EllipsisPipe } from './pipes/ellipsis/ellipsis';
// import { AddCommasPipe } from './pipes/add-comas/add-commas';
// import { OrderByPipe } from './pipes/order-by/order-by.pipe';
// export const PIPES = [OrderByPipe];


@NgModule({
  imports: [...ANGULAR_COMMON_MODULES, ...MATERIAL_MODULES],
  // declarations: [...PIPES],
  exports: [
    ...ANGULAR_COMMON_MODULES,
    ...MATERIAL_MODULES,
    ...UTILITY_SHARED_MODULES,
    // ...PIPES
  ],
  // declarations: [ConfirmDialogComponent]
})
export class SharedModule {}
