import React from "react";
import { IEmployee } from "../../models";
import Employee from "./Employee";
import { Link } from "react-router-dom";

function EmployeeList() {
  const data: IEmployee[] = [
    {
      id: 1,
      firstName: "Анна",
      lastName: "Иванова",
      patronymic: "Андреевна",
    },
    {
      id: 2,
      firstName: "Ольга",
      lastName: "Иванова",
      patronymic: "Владимировна",
    },
    {
      id: 3,
      firstName: "Наталья",
      lastName: "Петрова",
      patronymic: "Сергеевна",
    },
    {
      id: 4,
      firstName: "Анна",
      lastName: "Смирнова",
      patronymic: "Александровна",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {data.map((e: IEmployee, index: number) => (
            <Employee employee={e} />
          ))}
        </div>
      </div>
      <div className="row d-flex justify-content-end">
        <div className="col-3 ">
          <Link
            className="btn btn-primary"
            to={"create"}
            state={{
              id: 0,
              firstName: "",
              lastName: "",
              patronymic: "",
            }}
          >
            Создать
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
