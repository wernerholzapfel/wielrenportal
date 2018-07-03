import {Component, OnInit} from '@angular/core';
import {RiderService} from '../../services/rider.service';
import {GridOptions} from 'ag-grid';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';

@Component({
  selector: 'app-riderdetails',
  templateUrl: './riderdetails.component.html',
  styleUrls: ['./riderdetails.component.scss']
})
export class RiderdetailsComponent implements OnInit {

  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '', cellRenderer: this.determineFlag, minWidth: 50, maxWidth: 50},
    {headerName: 'Renner', cellRenderer: this.determineName, minWidth: 200},
    {headerName: 'Team', field: 'team.teamName', minWidth: 100},
    {headerName: 'Waarde', field: 'waarde', minWidth: 80},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 40},
    {headerName: 'Etappes', field: 'totalStagePoints', minWidth: 80},
    {headerName: 'Algemeen', field: 'tourPoints', minWidth: 80},
    {headerName: 'Berg', field: 'mountainPoints', minWidth: 80},
    {headerName: 'Punten', field: 'pointsPoints', minWidth: 80},
    {headerName: 'Jongeren', field: 'youthPoints', minWidth: 80},
    {headerName: 'Totaalpunten', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 80},
    {headerName: 'Waterdrager', field: 'waterdragerPoints', minWidth: 80},
  ];
  rowSelection = 'single';

  constructor(private riderService: RiderService, private store: Store<IAppState>) {
  }

  riders: any[];

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
    // todo move to store?
    this.store.select(getTour).subscribe(tour => {
      if (tour) {
        this.riderService.getDetailTourriders(tour.id)
          .subscribe(response =>
            this.riders = response);
      }
    });
  }

  determineIsOutText(params): string {
    return (params.data && params.data.isOut) ? 'Ja' : 'Nee';
  }

  determineTotaalpunten(params): number {
    return ((params.data.totalStagePoints ? params.data.totalStagePoints : 0) +
      (params.data.youthPoints ? params.data.youthPoints : 0) +
      (params.data.mountainPoints ? params.data.mountainPoints : 0) +
      (params.data.tourPoints ? params.data.tourPoints : 0) +
      (params.data.pointsPoints ? params.data.pointsPoints : 0));
  }
  determineName(params): string {
      return params.data.rider.firstName + ' ' + params.data.rider.surName + '</div>';
  }
  determineFlag(params): string {
    const url = '/assets/images/flag/' + params.data.rider.nationality + '.png';
    return '<img class="ag-grid-icon" style="height: 18px;" src=' + url + '>';
  }
  applyFilter(filterValue: string) {
    this.gridOptions.api.setQuickFilter(filterValue);
  }
}
