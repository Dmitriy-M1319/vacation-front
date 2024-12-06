import React from "react";
import { IEmployee } from "../../models";
import { Link } from "react-router-dom";

interface EmployeeProps {
  employee: IEmployee;
}

function Employee(props: EmployeeProps) {
  return (
    <div className="row m-2 p-2 border border-primary rounded">
      <div className="col-12">
        <div className="fw-bold">Сотрудник №{props.employee.id}</div>
        <p>Фамилия: {props.employee.last_name}</p>
        <p>Имя: {props.employee.first_name}</p>
        <p>Отчество: {props.employee.patronymic}</p>
      </div>
      <div className="col-12">
        <div className="row align-items-start">
          <div className="col-2">
            <Link
              className="btn btn-success"
              to={"update"}
              state={props.employee}
            >
              Редактировать
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                const delEmp = async () => {
                  const resp = await fetch(
                    "http://localhost:8080/v1/employees/" + props.employee.id,
                    {
                      method: "DELETE",
                    }
                  );

                  if (resp.ok) {
                    sessionStorage.removeItem("employees");
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

export default Employee;
