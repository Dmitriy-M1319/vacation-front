import React, { useState } from "react";
import { useLocation } from "react-router";

interface EmployeeFormProps {
  created: boolean;
}

function EmployeeForm({ created }: EmployeeFormProps) {
  const data = useLocation();
  const [newEmployee, setNewEmployee] = useState(data.state);

  const onCreate = () => {
    console.log("создать объект " + newEmployee);
  };

  const onUpdate = () => {
    console.log("Обновить объект " + newEmployee);
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
