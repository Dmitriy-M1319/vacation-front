import React, { useEffect, useState } from "react";
import { IEmployee, IVacation } from "../../models";
import Vacation from "./Vacation";
import { Link } from "react-router-dom";

function VacationList() {

  const [vacations, setVacations] = useState<IVacation[] | null>([]);
  const [employees, setEmployees] = useState<IEmployee[] | null>([]);

  useEffect(() => {
    const getData = async () => {
      const vacData: string | null = sessionStorage.getItem("vacations");
      if (!vacData) {
        const resp = await fetch("http://localhost:8081/v1/vacations");
        const result = await resp.json();
        console.log(result);
        setVacations(result["vacations"]);
        console.log(result["vacations"]);
        sessionStorage.setItem("vacations", JSON.stringify(result["vacations"]));
      } else {
        setVacations(JSON.parse(sessionStorage.getItem("vacations")!));
      }

      const empData: string | null = sessionStorage.getItem("employees");
      if (!empData) {
        const resp = await fetch("http://localhost:8081/v1/employees");
        const result = await resp.json();
        console.log(result);
        setEmployees(result["employees"]);
        sessionStorage.setItem("employees", JSON.stringify(result["employees"]));
      } else {
        setEmployees(JSON.parse(sessionStorage.getItem("employees")!));
      }
    };

    getData();  
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {vacations?.map((v: IVacation, index: number) => (
            <Vacation vacation={v} employee={employees?.find((e) => { return e.id === v.empId;})!}/>
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
              first_name: "",
              last_name: "",
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
