import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IParticipanttable} from '../../../models/participanttable.model';

@Component({
  selector: 'app-deelnemertop5',
  templateUrl: './deelnemertop5.component.html',
  styleUrls: ['./deelnemertop5.component.scss']
})
export class Deelnemertop5Component implements OnInit {

  constructor() {
  }

  @Input() top: number;
  @Input() stand$: Observable<IParticipanttable[]>;
  @Input() isRegistrationOpen$: Observable<boolean>;
  @Input() lastUpdated: string;
  @Input() title: string;
  @Input() participantPrediction: IParticipanttable;

  ngOnInit() {
  }

}
