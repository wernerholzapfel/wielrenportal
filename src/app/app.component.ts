import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ICyclist} from './models/cyclist.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {CyclistService} from './services/cyclist.service';
import {FetchCyclists} from './store/cyclist/cyclist.actions';
import {Store} from '@ngrx/store';
import {IAppState} from './store/store';
import {getCyclists} from './store/cyclist/cyclist.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns = ['firstName', 'nationality', 'dateOfBirth'];
  dataSource = new MatTableDataSource<ICyclist>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cyclistService: CyclistService, private store: Store<IAppState>) {
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */

  ngOnInit() {
    this.store.dispatch(new FetchCyclists());
    this.store.select(getCyclists).subscribe(data => {
      this.dataSource.data = data;
      if (this.dataSource.data) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {
  }
}
