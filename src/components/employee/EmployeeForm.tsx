import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IEmployee } from "../../models";

interface EmployeeFormProps {
  created: boolean;
}

function EmployeeForm({ created }: EmployeeFormProps) {
  const data = useLocation();
  const [newEmployee, setNewEmployee] = useState<IEmployee>(data.state);
  const navigate = useNavigate();

  const onCreate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8081/employees", {
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
            employees.push(emp);
            sessionStorage.setItem("employees", JSON.stringify(employees));
          }
        });
    };

    sendData();
    navigate("/employees", { replace: true });
  };

  const onUpdate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8081/employees/" + newEmployee.id, {
        method: "PUT",
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
            let truncatedData = employees.filter((e) => e.id !== emp.id);
            truncatedData.push(emp);
            sessionStorage.setItem("employees", JSON.stringify(truncatedData));
          }
        });
    };

    sendData();
    navigate("/employees", { replace: true });
  };

  return (
    <div className="card">
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
            value={newEmployee.lastName}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input
            className="form-control"
            value={newEmployee.firstName}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Отчество:</label>
          <input
            className="form-control"
            value={newEmployee.patronymic}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                patronymic: e.target.value,
              })
            }
          />
        </div>
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
  );
}

export default EmployeeForm;
