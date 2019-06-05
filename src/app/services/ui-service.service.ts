import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ETAPPE, KLASSEMENT} from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor() { }

  showUitslagenType: BehaviorSubject<string> = new BehaviorSubject(ETAPPE);

}
