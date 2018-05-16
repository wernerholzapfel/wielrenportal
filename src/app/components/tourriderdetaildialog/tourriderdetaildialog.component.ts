import {Component, Inject, OnInit} from '@angular/core';
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
    {headerName: 'Etappe', field: 'etappe.etappeName'},
    {headerName: 'Positie', field: 'position'},
    {headerName: 'Punten', field: 'punten'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

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
