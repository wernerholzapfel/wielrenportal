import {ITour} from './tour.model';
import {IRider} from './rider.model';

export interface IEtappe {
  id: string;
  etappeName: string;
  date: Date;
  type?: string;
  tour: ITour;
}

export interface IStageClassification {
  id: string;
  position: number;
  tour: ITour;
  etappe: IEtappe;
  tourrider: ITourrider;
}


export interface ITourrider {
  id: string;
  rider: IRider;
}
