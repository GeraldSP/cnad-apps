export class Prestacion {
  id: number;
  patient: string;
  exam: string;
  dateIn: Date;
  maxDaysToBeforeInform: number;
  informDate: Date;
  examImageId: string;
  type: number;
  medicalRecord: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
