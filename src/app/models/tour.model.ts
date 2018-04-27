import {ITourriders} from './tourriders.model';
import {ITeam} from './team.model';

export interface ITour {
  id: string;
  tourName: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  // tourRiders: ITourriders[];
  teams: ITeam[];
}
