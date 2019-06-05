import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IParticipanttable} from '../../../models/participanttable.model';

@Component({
  selector: 'app-ridertop5',
  templateUrl: './ridertop5.component.html',
  styleUrls: ['./ridertop5.component.scss']
})
export class Ridertop5Component implements OnInit {

  constructor() { }

  @Input() riderTop: IParticipanttable[];
  @Input() isRegistrationOpen$: Observable<boolean>;
  @Input() lastUpdated: string;
  @Input() title: string;

  ngOnInit() {
  }

}
