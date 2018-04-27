import {IRider} from './rider.model';

export interface IPartipantRidersFormModel {
  riders: IRider[];
  beschermdeRenner: IRider;
  meesterknecht: IRider;
  linkebal: IRider;
  waterdrager: IRider;
}
