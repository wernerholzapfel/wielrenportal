import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ICyclist} from './models/cyclist.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {CyclistService} from './services/cyclist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns = ['firstName', 'nationality', 'dateOfBirth'];
  dataSource = new MatTableDataSource<ICyclist>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cyclistService: CyclistService) {}
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */

  ngOnInit() {

    this.cyclistService.getCyclists().subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
  }
}
