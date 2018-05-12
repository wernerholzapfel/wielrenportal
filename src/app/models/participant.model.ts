import {IRider} from './rider.model';
import {IEtappe} from './etappe.model';

export interface IParticipant {
  id: string;
  displayName: string;
  predictions: IPrediction[];
  punten: number;
}


export interface IPrediction {
  id: string;
  isRider: boolean;
  isWaterdrager: boolean;
  isMeesterknecht: boolean;
  isLinkebal: boolean;
  isBeschermdeRenner: boolean;
  rider: IRider[];
  punten: number;
}

export interface IStageclassifications {
  id: string;
  position: number;
  etappe: IEtappe;
  punten: number;
}
