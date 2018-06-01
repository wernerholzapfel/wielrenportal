import {IPrediction} from './participant.model';

export interface IParticipanttable {
  id: string;
  displayName: string;
  predictions: IPrediction[];
  totalPoints: number;
}

