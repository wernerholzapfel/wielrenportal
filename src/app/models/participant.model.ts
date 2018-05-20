import {IRider} from './rider.model';
import {IEtappe} from './etappe.model';

export interface IParticipant {
  id: string;
  displayName: string;
  predictions: IPrediction[];
  totalPoints: number;
  selectedRider?: IRider;
}


export interface IPrediction {
  id: string;
  isRider: boolean;
  isWaterdrager: boolean;
  isMeesterknecht: boolean;
  isLinkebal: boolean;
  isBeschermdeRenner: boolean;
  rider: IRider[];
  totalStagePoints?: number;
  tourPoints?: number;
  mountainPoints?: number;
  youthPoints?: number;
}


export interface IStageclassifications {
  id: string;
  position: number;
  etappe: IEtappe;
  stagePoints: number;
}
