import {Component, OnInit} from '@angular/core';
import {ParticipantService} from '../../services/participant.service';
import {IParticipant} from '../../models/participant.model';
import {getTour, getTourId} from '../../store/tour/tour.reducer';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  participants: IParticipant[];

  constructor(private participantService: ParticipantService, private store: Store<IAppState>) {
  }

  ngOnInit() {
    // todo move to service ?
    this.store.select(getTour).subscribe(tour => {
      if (tour) {
        this.participantService.getParticipants(tour.id).subscribe(response => this.participants = response);

      }
    });
  }

}
