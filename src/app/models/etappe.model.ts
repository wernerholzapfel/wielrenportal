import {ITour} from './tour.model';
import {IRider} from './rider.model';
import {IPrediction} from './participant.model';

export interface IEtappe {
  id: string;
  etappeNumber: number;
  etappeName: string;
  date: Date;
  type?: string;
  tour: ITour;
  isDriven: boolean;
}

export interface IStageClassification {
  id?: string;
  position: number;
  tour: ITour;
  etappe: IEtappe;
  tourrider: ITourrider;
}

export interface ITourClassification {
  id?: string;
  position: number;
  tour: ITour;
  tourrider: ITourrider;
}

export interface ITourrider {
  id: string;
  rider: IRider;
  stageclassifications?: IStageClassification[];
  predictions?: IPrediction[];
}
