import {ITour} from './tour.model';

export interface IEtappe {
  id: string;
  etappeName: string;
  date: Date;
  type?: string;
  tour: ITour;
}
