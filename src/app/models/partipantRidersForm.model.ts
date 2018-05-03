import {IRider} from './rider.model';
import {ITour} from './tour.model';

export interface IPartipantRidersFormModel {
  riders: IRider[];
  beschermdeRenner: IRider;
  meesterknecht: IRider;
  linkebal: IRider;
  waterdrager: IRider;
  tour: ITour;
}
