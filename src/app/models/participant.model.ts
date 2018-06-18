import {IRider} from './rider.model';
import {IEtappe} from './etappe.model';
import {ITeam} from './team.model';

export interface IParticipant {
  id: string;
  displayName: string;
  teamName: string;
  predictions: IPrediction[];
  totalPoints: number;
  selectedRider?: IRider;
}

export interface ITourrider {
  id: string;
  rider: IRider;
  isActive: boolean;
  isBeschermdeRenner?: boolean;
  isMeesterknecht?: boolean;
  isLinkebal?: boolean;
  isWaterdrager?: boolean;
  isRider?: boolean;
  isSelected?: boolean;
  waarde?: number;
  position?: number;
  stageclassifications?: IStageclassifications[];
  team?: ITeam;
}

export interface IPrediction {
  id?: string;
  isRider: boolean;
  isWaterdrager: boolean;
  isMeesterknecht: boolean;
  isLinkebal: boolean;
  isBeschermdeRenner: boolean;
  rider: ITourrider;
  totalStagePoints?: number;
  tourPoints?: number;
  mountainPoints?: number;
  youthPoints?: number;
  waarde?: number;
}


export interface IStageclassifications {
  id: string;
  position: number;
  etappe: IEtappe;
  stagePoints: number;
}
