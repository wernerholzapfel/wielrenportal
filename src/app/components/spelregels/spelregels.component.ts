import {Component, OnInit} from '@angular/core';
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
    {headerName: 'Positie', field: 'positie', width: 100},
    {headerName: 'Etappe *', field: 'etappe', width: 100},
    {headerName: 'Algemeen **', field: 'algemeen', width: 115},
    {headerName: 'Berg **', field: 'berg', width: 100},
    {headerName: 'Punten **', field: 'punten', width: 100},
    {headerName: 'Jongeren **', field: 'jongeren', width: 110},
  ];

  constructor() {
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };

    this.spelregelstable = [
      {
      'positie': '1',
      'etappe': 60,
      'algemeen': 150,
      'berg': 120,
      'punten': 120,
      'jongeren': 90
    }, {
      'positie': '2',
      'etappe': 52,
      'algemeen': 130,
      'berg': 104,
      'punten': 88,
      'jongeren': 78
    }, {
      'positie': '3',
      'etappe': 44,
      'algemeen': 110,
      'berg': 88,
      'punten': 88,
      'jongeren': 66
    }, {
      'positie': '4',
      'etappe': 38,
      'algemeen': 95,
      'berg': 76,
      'punten': 76,
      'jongeren': 57
    }, {
      'positie': '5',
      'etappe': 34,
      'algemeen': 85,
      'berg': 68,
      'punten': 68,
      'jongeren': 51
    }, {
      'positie': '6',
      'etappe': 30,
      'algemeen': 75,
      'berg': 60,
      'punten': 60,
      'jongeren': 45
    }, {
      'positie': '7',
      'etappe': 28,
      'algemeen': 70,
      'berg': 56,
      'punten': 56,
      'jongeren': 42
    }, {
      'positie': '8',
      'etappe': 26,
      'algemeen': 65,
      'berg': 52,
      'punten': 52,
      'jongeren': 39
    }, {
      'positie': '9',
      'etappe': 24,
      'algemeen': 60,
      'berg': 48,
      'punten': 48,
      'jongeren': 36
    }, {
      'positie': '10',
      'etappe': 22,
      'algemeen': 55,
      'berg': 44,
      'punten': 44,
      'jongeren': 33
    }, {
      'positie': '11',
      'etappe': 20,
      'algemeen': 50,
      'berg': 40,
      'punten': 40,
      'jongeren': 30
    }, {
      'positie': '12',
      'etappe': 18,
      'algemeen': 45,
      'berg': 36,
      'punten': 36,
      'jongeren': 27
    }, {
      'positie': '13',
      'etappe': 16,
      'algemeen': 40,
      'berg': 32,
      'punten': 32,
      'jongeren': 24
    }, {
      'positie': '14',
      'etappe': 14,
      'algemeen': 35,
      'berg': 28,
      'punten': 28,
      'jongeren': 21
    }, {
      'positie': '15',
      'etappe': 12,
      'algemeen': 30,
      'berg': 24,
      'punten': 24,
      'jongeren': 18
    }, {
      'positie': '16',
      'etappe': 10,
      'algemeen': 25,
      'berg': 20,
      'punten': 20,
      'jongeren': 15
    }, {
      'positie': '17',
      'etappe': 8,
      'algemeen': 20,
      'berg': 16,
      'punten': 16,
      'jongeren': 12
    }, {
      'positie': '18',
      'etappe': 6,
      'algemeen': 15,
      'berg': 12,
      'punten': 12,
      'jongeren': 9
    }, {
      'positie': '19',
      'etappe': 4,
      'algemeen': 10,
      'berg': 8,
      'punten': 8,
      'jongeren': 6
    }, {
      'positie': '20',
      'etappe': 2,
      'algemeen': 5,
      'berg': 4,
      'punten': 4,
      'jongeren': 3
    }];
  }

}
