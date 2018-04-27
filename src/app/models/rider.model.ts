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
  beschermdeRenner?: boolean;
  meesterknecht?: boolean;
  linkebal?: boolean;
  waterdrager?: boolean;
  isSelected?: boolean;
}
