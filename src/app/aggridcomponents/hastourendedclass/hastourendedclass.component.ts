import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {getTour} from '../../store/tour/tour.reducer';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ITour} from '../../models/tour.model';

@Component({
  selector: 'app-hastourendedclass',
  templateUrl: './hastourendedclass.component.html',
  styleUrls: ['./hastourendedclass.component.scss']
})
export class HastourendedclassComponent implements ICellRendererAngularComp {

  constructor(private store: Store<IAppState>) {
  }

  private params: any;
  public tour: ITour;
  private content: string;

  // called on init
  agInit(params: any): void {
    this.params = params;
    this.store.select(getTour).subscribe(tour => {
      this.tour = tour;
    });
  }

  refresh(params: any): boolean {
    return false;
  }

  public value(): string {
    this.content = this.params.value;
    return this.content;
  }
}
