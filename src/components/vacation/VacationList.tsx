import React from "react";
import { IVacation } from "../../models";
import Vacation from "./Vacation";
import { Link } from "react-router-dom";

function VacationList() {
  const data: IVacation[] = [
    {
      id: 1,
      employee: {
        id: 1,
        firstName: "Анна",
        lastName: "Иванова",
        patronymic: "Андреевна",
      },
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      daysCount: 31,
    },
    {
      id: 2,
      employee: {
        id: 2,
        firstName: "Ольга",
        lastName: "Иванова",
        patronymic: "Владимировна",
      },
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      daysCount: 31,
    },
    {
      id: 3,
      employee: {
        id: 3,
        firstName: "Наталья",
        lastName: "Петрова",
        patronymic: "Сергеевна",
      },
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      daysCount: 31,
    },
    {
      id: 4,
      employee: {
        id: 4,
        firstName: "Анна",
        lastName: "Смирнова",
        patronymic: "Александровна",
      },
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      daysCount: 31,
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {data.map((v: IVacation, index: number) => (
            <Vacation vacation={v} />
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

export default VacationList;
