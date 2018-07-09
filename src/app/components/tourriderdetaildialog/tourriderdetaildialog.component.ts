import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {GridOptions} from 'ag-grid';
import {IStageClassification} from '../../models/etappe.model';

@Component({
  selector: 'app-tourriderdetaildialog',
  templateUrl: './tourriderdetaildialog.component.html',
  styleUrls: ['./tourriderdetaildialog.component.scss']
})
export class TourriderdetaildialogComponent implements OnInit {


  public gridOptions: GridOptions;
  stageclassifications: IStageClassification[];
  agColumns = [
    {headerName: '#', field: 'etappe.etappeNumber', sort: 'asc', width: 75},
    {headerName: 'Etappe', field: 'etappe.etappeName'},
    {headerName: 'Positie', field: 'position', width: 135},
    {headerName: 'Punten', field: 'stagePoints', width: 135}
  ];

  public participantsGridOptions: GridOptions;
  participantsAgColumns = [
    {headerName: 'Naam', field: 'participant.displayName'},
    {headerName: 'Rol', cellRenderer: this.determineRole},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.participantsGridOptions = <GridOptions>{
      columnDefs: this.participantsAgColumns,
      localeText: {noRowsToShow: 'Renner is niet gekozen'},
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      localeText: {noRowsToShow: 'Geen score in etappes'},
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };

    this.stageclassifications = this.data.stageclassifications ? this.data.stageclassifications : []
  }

  determineRole(params): string {
    // todo implement with mat-icon and mat-tooltip https://plnkr.co/edit/?p=preview
    if (params.data.isWaterdrager) {
      return '<div><mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">delete_outline</mat-icon>' +
      'Waterdrager';
    }
    if (params.data.isLinkebal) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">new_releases</mat-icon>' +
       'Linkebal';
    }
    if (params.data.isBeschermdeRenner) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">verified_user</mat-icon>' +
       'Beschermde renner';
    }
    if (params.data.isMeesterknecht) {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">build</mat-icon>' +
        'Meesterknecht';
    } else {
      return '<mat-icon class="mat-icon mat-list-icon material-icons ag-grid-icon">directions_bike</mat-icon>' +
        'Renner';
    }
  }
}
