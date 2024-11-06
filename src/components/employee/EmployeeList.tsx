import React, { useEffect, useState } from "react";
import { IEmployee } from "../../models";
import Employee from "./Employee";
import { Link } from "react-router-dom";
import { log } from "console";

function EmployeeList() {
  const [employees, setEmployees] = useState<IEmployee[] | null>([]);

  useEffect(() => {
    const getData = async () => {
      const data: string | null = sessionStorage.getItem("employees");
      if (!data) {
        const resp = await fetch("http://localhost:8081/employees");
        const result = await resp.json();
        console.log(result);
        setEmployees(result);
        sessionStorage.setItem("employees", JSON.stringify(result));
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
          {employees?.map((e: IEmployee, index: number) => (
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
