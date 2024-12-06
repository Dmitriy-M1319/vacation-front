export interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
}

export interface IVacation {
  id: number;
  emp_id: number;
  start_date: string;
  end_date: string;
  days_count: number;
}

// export interface IEmployeeResponse {
//   id: number;
//   first_name: string;
//   last_name: string;
//   patronymic: string;
// }

// export function toResponse(e: IEmployee): IEmployeeResponse {
//   return {
//     id: e.id,
//     first_name: e.firstName,
//     last_name: e.lastName,
//     patronymic: e.patronymic
//   // };
// }
