import {IRider} from './rider.model';
import {ITour} from './tour.model';
import {IPrediction} from './participant.model';

export interface IPartipantRidersFormModel {
  riders: IPrediction[];
  beschermdeRenner: IPrediction;
  meesterknecht: IPrediction;
  linkebal: IPrediction;
  waterdrager: IPrediction;
  tour: ITour;
}
