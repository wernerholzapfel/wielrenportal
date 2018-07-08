import {Component, OnInit} from '@angular/core';
import {RiderService} from '../../services/rider.service';
import {GridOptions} from 'ag-grid';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {MatDialog} from '@angular/material';

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

  constructor(private riderService: RiderService,
              public dialog: MatDialog,
              private store: Store<IAppState>) {
  }

  riders: any[];
  hasTourEnded: boolean;

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.agColumns,
      context: {parentComponent: this},
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      enableSorting: true,
    };
    // todo move to store?
    this.store.select(getTour).subscribe(tour => {
      if (tour) {
        this.hasTourEnded = tour.hasEnded;
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
    if (params.context.parentComponent.hasTourEnded) {
      return ((params.data.totalStagePoints ? params.data.totalStagePoints : 0) +
        (params.data.youthPoints ? params.data.youthPoints : 0) +
        (params.data.mountainPoints ? params.data.mountainPoints : 0) +
        (params.data.tourPoints ? params.data.tourPoints : 0) +
        (params.data.pointsPoints ? params.data.pointsPoints : 0));
    } else {
      return params.data.totalStagePoints ? params.data.totalStagePoints : 0;

    }
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

  openTourRidersDetailDialog(data: any) {
    const dialogRef = this.dialog.open(TourriderdetaildialogComponent, {
      data: data,
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
      this.gridOptions.api.deselectAll();
    });
  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.openTourRidersDetailDialog(event.data);
    }
  }
}
