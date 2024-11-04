export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export interface IVacation {
  id: number;
  employee: IEmployee;
  startDate: string;
  endDate: string;
  daysCount: number;
}
