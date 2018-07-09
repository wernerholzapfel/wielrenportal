import {Component, OnInit} from '@angular/core';
import {RiderService} from '../../services/rider.service';
import {GridOptions} from 'ag-grid';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getTour} from '../../store/tour/tour.reducer';
import {TourriderdetaildialogComponent} from '../tourriderdetaildialog/tourriderdetaildialog.component';
import {MatDialog} from '@angular/material';
import {ITour} from '../../models/tour.model';

@Component({
  selector: 'app-riderdetails',
  templateUrl: './riderdetails.component.html',
  styleUrls: ['./riderdetails.component.scss']
})
export class RiderdetailsComponent implements OnInit {

  tour: ITour;
  public gridOptions: GridOptions;
  agColumns = [
    {headerName: '', cellRenderer: this.determineFlag, minWidth: 50, maxWidth: 50},
    {
      headerName: 'Renner',
      cellRenderer: this.determineName,
      minWidth: 200,
      maxWidth: 200,
      getQuickFilterText: this.determineName
    },
    {headerName: 'Team', field: 'team.teamName', minWidth: 100, maxWidth: 100},
    {headerName: 'Waarde', field: 'waarde', minWidth: 100, maxWidth: 100},
    {headerName: 'Uit', valueGetter: this.determineIsOutText, minWidth: 60, maxWidth: 60},
    {headerName: 'Etappes', field: 'totalStagePoints', minWidth: 100, maxWidth: 100},
    {headerName: 'Algemeen', field: 'tourPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Berg', field: 'mountainPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Punten', field: 'pointsPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Jongeren', field: 'youthPoints', cellClass: this.determineClass, minWidth: 100, maxWidth: 100},
    {headerName: 'Totaal', sort: 'desc', valueGetter: this.determineTotaalpunten, minWidth: 100, maxWidth: 100},
    {headerName: 'Waterdrager', field: 'waterdragerPoints', minWidth: 120, maxWidth: 120},
    {
      headerName: '# RE',
      valueGetter: this.determineRiderChoosenCount,
      minWidth: 80,
      maxWidth: 80,
    },
    {
      headerName: '# MK',
      valueGetter: this.determineMeesterknechtChoosenCount,
      minWidth: 80,
      maxWidth: 80
    },
    {headerName: '# BR', valueGetter: this.determineBeschermderennerChoosenCount, minWidth: 80, maxWidth: 80},
    {headerName: '# WD', valueGetter: this.determineWaterdragerChoosenCount, minWidth: 80, maxWidth: 80},
    {headerName: '# LB', valueGetter: this.determineLinkebalChoosenCount, minWidth: 80, maxWidth: 80},

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
      context: {parentComponent: this},
      columnDefs: this.agColumns,
      onGridReady: () => {
        this.store.select(getTour).subscribe(tour => {
          this.tour = tour;
        });
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

  determineRiderChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isRider).length;
  }

  determineWaterdragerChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isWaterdrager).length;
  }

  determineLinkebalChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isLinkebal).length;
  }

  determineBeschermderennerChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isBeschermdeRenner).length;
  }

  determineMeesterknechtChoosenCount(params): number {
    return params.data.predictions.filter(p => p.isMeesterknecht).length;
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
      height: '90%'
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

  determineClass(params): string {
    // todo
    //  return (params.context.parentComponent.tour && !params.context.parentComponent.tour.hasEnded ? 'tour_not_ended' : '');
    return 'tour_not_ended';
  }
}

