import React from "react";
import { IEmployee, IVacation } from "../../models";
import { Link } from "react-router-dom";

interface VacationProps {
  vacation: IVacation;
  employee: IEmployee;
}

function Vacation({ vacation, employee }: VacationProps) {
  return (
    <div className="row m-2 p-2 border border-primary rounded">
      <div className="col-12">
        <div className="fw-bold">Отпуск №{vacation.id}</div>
        <p>
          Сотрудник: {employee?.last_name} {employee?.first_name}{" "}
          {employee?.patronymic}
        </p>
        <p>Начало: {vacation.start_date}</p>
        <p>Конец: {vacation.end_date}</p>
        <p>Продолжительность (в днях): {vacation.days_count}</p>
      </div>
      <div className="col-12">
        <div className="row align-items-start">
          <div className="col-2">
            <Link className="btn btn-success" to={"update"} state={vacation}>
              Редактировать
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                const delEmp = async () => {
                  const resp = await fetch(
                    "http://localhost:8080/v1/vacations/" + vacation.id,
                    {
                      method: "DELETE",
                    }
                  );

                  if (resp.ok) {
                    sessionStorage.removeItem("vacations");
                    window.location.reload();
                  }
                };

                delEmp();
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacation;
