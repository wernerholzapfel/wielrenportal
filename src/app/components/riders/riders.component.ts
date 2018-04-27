import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {IRider} from '../../models/rider.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {RiderService} from '../../services/rider.service';
import {FetchRiders} from '../../store/rider/rider.actions';
import {getRiders} from '../../store/rider/rider.reducer';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss']
})
export class RidersComponent implements OnInit {

  displayedColumns = ['firstName', 'nationality', 'dateOfBirth'];
  dataSource = new MatTableDataSource<IRider>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private riderService: RiderService, private store: Store<IAppState>) {
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */

  ngOnInit() {
    this.store.dispatch(new FetchRiders());
    this.store.select(getRiders).subscribe(data => {
      this.dataSource.data = data;
      if (this.dataSource.data) {
        this.dataSource.sort = this.sort;
      }
    });
  }

}
