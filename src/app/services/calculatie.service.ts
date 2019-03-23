import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatieService {

  constructor() { }

  // todo duplicate code mogelijk tourrider.reducer onderstaande functie laten aanroepen, anders bij wijzigingen beide plekken doen.
  determineTotaalpunten(renner, tour): number {
    if (tour && tour.hasEnded) {
      return ((renner.totalStagePoints ? renner.totalStagePoints : 0) +
        (renner.youthPoints ? renner.youthPoints : 0) +
        (renner.mountainPoints ? renner.mountainPoints : 0) +
        (renner.tourPoints ? renner.tourPoints : 0) +
        (renner.pointsPoints ? renner.pointsPoints : 0));
    } else {
      return renner.totalStagePoints ? renner.totalStagePoints : 0;
    }
  }

}
