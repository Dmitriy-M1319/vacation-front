import React from "react";
import { IVacation } from "../../models";
import { Link } from "react-router-dom";

interface VacationProps {
  vacation: IVacation;
}

function Vacation({ vacation }: VacationProps) {
  return (
    <div className="row m-2 p-2 border border-primary rounded">
      <div className="col-12">
        <div className="fw-bold">Отпуск №{vacation.id}</div>
        <p>
          Сотрудник: {vacation.employee.lastName} {vacation.employee.firstName}{" "}
          {vacation.employee.patronymic}
        </p>
        <p>Начало: {vacation.startDate}</p>
        <p>Конец: {vacation.endDate}</p>
        <p>Продолжительность (в днях): {vacation.daysCount}</p>
      </div>
      <div className="col-12">
        <div className="row align-items-start">
          <div className="col-2">
            <Link className="btn btn-success" to={"update"} state={vacation}>
              Редактировать
            </Link>
          </div>
          <div className="col-2">
            <button className="btn btn-danger">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacation;
