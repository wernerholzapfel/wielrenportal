import { Component, OnInit } from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';

@Component({
  selector: 'app-participanttable',
  templateUrl: './participanttable.component.html',
  styleUrls: ['./participanttable.component.scss']
})
export class ParticipanttableComponent implements OnInit {

  participants: IParticipant[];

  constructor(private participantService: ParticipantService) {
  }

  ngOnInit() {
    this.participantService.getParticipantsTable().subscribe(response => this.participants = response);
  }

}
