import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  participants: IParticipant[];

  constructor(private participantService: ParticipantService) {
  }

  ngOnInit() {
    // todo move to service ?
    this.participantService.getParticipants().subscribe(response => this.participants = response);
  }

}
