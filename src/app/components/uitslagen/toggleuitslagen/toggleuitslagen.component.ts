import {Component, Input, OnInit} from '@angular/core';
import {UiServiceService} from '../../../services/ui-service.service';
import {ETAPPE, KLASSEMENT} from '../../../models/constants';

@Component({
  selector: 'app-toggleuitslagen',
  templateUrl: './toggleuitslagen.component.html',
  styleUrls: ['./toggleuitslagen.component.scss']
})
export class ToggleuitslagenComponent implements OnInit {

  constructor(private uiService: UiServiceService) {
  }

  ETAPPE = ETAPPE;
  KLASSEMENT = KLASSEMENT;

  @Input() checked: string;

  ngOnInit() {
  }

  setUitslagenType(uitslagenType) {
    this.uiService.showUitslagenType.next(uitslagenType);
  }

}
