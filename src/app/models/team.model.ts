import {ITourriders} from './tourriders.model';

export interface ITeam {
  id: string;
  teamName: string;
  teamNameShort: string;
  country: string;
  tourRiders: ITourriders[];
  selected?: boolean;
}
