import {IStageclassifications} from './participant.model';
import {ITeam} from './team.model';

export interface IRider {
  id: string;
  firstName: string;
  firstNameShort: string;
  initials: string;
  surName: string;
  nationality: string;
  surNameShort: string;
  dateOfBirth: string;
  isActive: boolean;
  isBeschermdeRenner?: boolean;
  isMeesterknecht?: boolean;
  isLinkebal?: boolean;
  isWaterdrager?: boolean;
  isRenner?: boolean;
  isSelected?: boolean;
  isOut?: boolean;
  waarde?: number;
  position?: number;
  stageclassifications?: IStageclassifications[];
  team?: ITeam;
}
