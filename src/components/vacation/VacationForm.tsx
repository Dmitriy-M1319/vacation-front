import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IEmployee, IVacation } from "../../models";

interface VacationFormProps {
  created: boolean;
}

function VacationForm({ created = true }: VacationFormProps) {
  const data = useLocation();
  const [newVacation, setNewVacaiton] = useState<IVacation>(data.state);
  const [employees, setEmployees] = useState<IEmployee[] | null>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number>(-1);
  const [changed, setChanged] = useState<Boolean>(false);
  const navigate = useNavigate();

  const getEmployees = async () => {
    const emps: string | null = sessionStorage.getItem("employees");
    if (!emps) {
      const resp = await fetch("http://localhost:8081/employees");
      const result = await resp.json();
      console.log(result);
      setEmployees(result);
      sessionStorage.setItem("employees", JSON.stringify(result));
    } else {
      setEmployees(JSON.parse(sessionStorage.getItem("employees")!));
    }
  };

  useEffect(() => {
    const clearSession = () => {
      sessionStorage.removeItem("vacation");
    };

    window.addEventListener("popstate", clearSession);

    getEmployees();
    console.log(employees);
    setSelectedEmployee(
      newVacation.id === 0 && newVacation.empId === 0 ? -1 : newVacation.empId
    );

    const savedState = sessionStorage.getItem("vacation");
    console.log(savedState);
    if (savedState) {
      setNewVacaiton(JSON.parse(savedState));
      setSelectedEmployee(JSON.parse(savedState).empId);
    }
  }, []);

  useEffect(() => {
    if (changed) {
      sessionStorage.setItem("vacation", JSON.stringify(newVacation));
      console.log(newVacation);
    }
  }, [newVacation]);

  const onCreate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8081/vacations", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVacation),
      })
        .then((response) => response.json())
        .then((vac) => {
          const localVacations = sessionStorage.getItem("vacations");
          if (localVacations) {
            let vacations: IVacation[] = JSON.parse(localVacations);
            vacations.push(vac);
            sessionStorage.setItem("vacations", JSON.stringify(vacations));
          }
        });
    };

    sendData();
    sessionStorage.removeItem("vacation");
    navigate("/vacations", { replace: true });
  };

  const onUpdate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8081/vacations/" + newVacation.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVacation),
      })
        .then((response) => response.json())
        .then((vac) => {
          const localVacations = sessionStorage.getItem("vacations");
          if (localVacations) {
            let vacations: IVacation[] = JSON.parse(localVacations);
            let truncatedData = vacations.filter((v) => v.id !== vac.id);
            truncatedData.push(vac);
            sessionStorage.setItem("vacations", JSON.stringify(truncatedData));
          }
        });
    };

    sendData();
    sessionStorage.removeItem("vacation");
    navigate("/vacations", { replace: true });
  };
  return (
    <div className="card m-3">
      <div className="card-header">
        {created ? <h4>Создать отпуск</h4> : <h4>Редактировать отпуск</h4>}
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Сотрудник:</label>
          <select
            className="form-control"
            value={selectedEmployee}
            onChange={(e) => {
              setChanged(true);
              setNewVacaiton({
                ...newVacation,
                empId: Number.parseInt(e.target.value),
              });
              setSelectedEmployee(Number.parseInt(e.target.value));
            }}
          >
            <option value="-1" disabled>
              Выберите сотрудника
            </option>
            {employees!.map((emp) => (
              <option key={emp.id} value={emp.id.toString()}>
                {emp.lastName} {emp.firstName} {emp.patronymic}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Начало:</label>
          <input
            className="form-control"
            value={newVacation.startDate}
            onChange={(e) => {
              setChanged(true);
              setNewVacaiton({
                ...newVacation,
                startDate: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Конец:</label>
          <input
            className="form-control"
            value={newVacation.endDate}
            onChange={(e) => {
              setChanged(true);
              setNewVacaiton({
                ...newVacation,
                endDate: e.target.value,
              });
            }}
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

export default VacationForm;
