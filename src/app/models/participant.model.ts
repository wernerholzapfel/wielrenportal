import {IRider} from './rider.model';

export interface IParticipant {
  id: string;
  displayName: string;
  predictions: IPrediction[];
}


export interface IPrediction {
  id: string;
  isRider: boolean;
  isWaterdrager: boolean;
  isMeesterknecht: boolean;
  isLinkebal: boolean;
  isBeschermdeRenner: boolean;
  rider: IRider[];
}
