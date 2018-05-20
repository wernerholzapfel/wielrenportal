import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {GridOptions} from 'ag-grid';

@Component({
  selector: 'app-tourriderdetaildialog',
  templateUrl: './tourriderdetaildialog.component.html',
  styleUrls: ['./tourriderdetaildialog.component.scss']
})
export class TourriderdetaildialogComponent implements OnInit {

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '#', field: 'etappe.etappeNumber', sort: 'asc', width: 75},
    {headerName: 'Etappe', field: 'etappe.etappeName'},
    {headerName: 'Positie', field: 'position', width: 135},
    {headerName: 'Punten', field: 'stagePoints', width: 135}
  ];


  constructor() {
  }

  @Input() data;

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
  }
}
