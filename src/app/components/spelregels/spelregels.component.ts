import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';

@Component({
  selector: 'app-spelregels',
  templateUrl: './spelregels.component.html',
  styleUrls: ['./spelregels.component.scss']
})
export class SpelregelsComponent implements OnInit {
  spelregelstable: any[];
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: 'Positie', field: 'positie', minWidth: 80},
    {headerName: 'Etappe *', field: 'etappe', minWidth: 80},
    {headerName: 'Algemeen **', field: 'algemeen', minWidth: 80},
    {headerName: 'Berg **', field: 'berg', minWidth: 80},
    {headerName: 'Punten **', field: 'punten', minWidth: 80},
    {headerName: 'Jongeren **', field: 'jongeren', minWidth: 80},
     ];
  constructor() { }

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };

    this.spelregelstable = [{
        'positie': '1',
        'etappe': 60,
        'algemeen': 150,
        'berg': 120,
        'punten': 120,
        'jongeren': 90
    }];
  }

}
