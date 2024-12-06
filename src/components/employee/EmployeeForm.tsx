import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IEmployee } from "../../models";

interface EmployeeFormProps {
  created: boolean;
}

function EmployeeForm({ created = true }: EmployeeFormProps) {
  const data = useLocation();
  const [newEmployee, setNewEmployee] = useState<IEmployee>(data.state);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const oldId = newEmployee.id;
      const resp = await fetch(
        "http://localhost:8080/v1/employees/cache/" + newEmployee.id
      );
      if (resp.ok) {
        const form = await resp.json();
        setNewEmployee({ id: oldId, ...form["emp"] });
        console.log({ id: oldId, ...form["emp"] });
      }
    };
    getData();
  }, []);

  const deleteFormDataFromCache = () => {
    const delEmp = async () => {
      await fetch(
        "http://localhost:8080/v1/employees/cache/" + newEmployee.id,
        {
          method: "DELETE",
        }
      );
    };
    delEmp();
  };

  const onCreate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8080/v1/employees", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      })
        .then((response) => response.json())
        .then((emp) => {
          const localEmployees = sessionStorage.getItem("employees");
          if (localEmployees) {
            let employees: IEmployee[] = JSON.parse(localEmployees);
            employees.push(emp["emp"]);
            sessionStorage.setItem("employees", JSON.stringify(employees));
          }
        });
    };

    sendData();
    deleteFormDataFromCache();
    sessionStorage.removeItem("employee");
    navigate("/employees", { replace: true });
  };

  const onUpdate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8081/v1/employees/" + newEmployee.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp: newEmployee,
        }),
      })
        .then((response) => response.json())
        .then((emp) => {
          const localEmployees = sessionStorage.getItem("employees");
          if (localEmployees) {
            let employees: IEmployee[] = JSON.parse(localEmployees);
            let truncatedData = employees.filter((e) => e.id !== emp.id);
            truncatedData.push(emp["emp"]);
            sessionStorage.setItem("employees", JSON.stringify(truncatedData));
          }
        });
    };

    sendData();
    deleteFormDataFromCache();
    sessionStorage.removeItem("employee");
    navigate("/employees", { replace: true });
  };

  const onFormSave = () => {
    const sendData = async () => {
      await fetch(
        "http://localhost:8080/v1/employees/cache/" + newEmployee.id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emp: newEmployee,
          }),
        }
      );
    };

    console.log(JSON.stringify({ emp: newEmployee }));
    sendData();
  };

  return (
    <div className="card m-3">
      <div className="card-header">
        {created ? (
          <h4>Создать сотрудника</h4>
        ) : (
          <h4>Редактировать сотрудника</h4>
        )}
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Фамилия:</label>
          <input
            className="form-control"
            value={newEmployee.last_name}
            onChange={(e) => {
              setNewEmployee({
                ...newEmployee,
                last_name: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input
            className="form-control"
            value={newEmployee.first_name}
            onChange={(e) => {
              setNewEmployee({
                ...newEmployee,
                first_name: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Отчество:</label>
          <input
            className="form-control"
            value={newEmployee.patronymic}
            onChange={(e) => {
              setNewEmployee({
                ...newEmployee,
                patronymic: e.target.value,
              });
            }}
          />
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-secondary me-3" onClick={onFormSave}>
              Сохранить черновик
            </button>
            {created ? (
              <button className="btn btn-primary" onClick={onCreate}>
                Создать
              </button>
            ) : (
              <button className="btn btn-success" onClick={onUpdate}>
                Редактировать
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
