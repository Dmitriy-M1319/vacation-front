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
  const navigate = useNavigate();

  const getEmployees = async () => {
    const emps: string | null = sessionStorage.getItem("employees");
    if (!emps) {
      const resp = await fetch("http://localhost:8080/v1/employees");
      const result = await resp.json();
      console.log(result);
      setEmployees(result["employees"]);
      sessionStorage.setItem("employees", JSON.stringify(result));
    } else {
      setEmployees(JSON.parse(sessionStorage.getItem("employees")!));
    }
  };

  useEffect(() => {
    const getData = async () => {
      const oldId = newVacation.id;
      const resp = await fetch(
        "http://localhost:8080/v1/vacations/cache/" + newVacation.id
      );
      if (resp.ok) {
        const form = await resp.json();
        setNewVacaiton({ id: oldId, ...form["vac"] });
        console.log({ id: oldId, ...form["vac"] });
      }
    };

    getEmployees();
    getData();
  }, []);

  const deleteFormDataFromCache = () => {
    const delVac = async () => {
      await fetch(
        "http://localhost:8080/v1/vacations/cache/" + newVacation.id,
        {
          method: "DELETE",
        }
      );
    };
    delVac();
  };

  const onFormSave = () => {
    const sendData = async () => {
      await fetch(
        "http://localhost:8080/v1/vacations/cache/" + newVacation.id,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vac: newVacation,
          }),
        }
      );
    };

    console.log(JSON.stringify({ vac: newVacation }));
    sendData();
  };

  const onCreate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8080/v1/vacations", {
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
            vacations.push(vac["vac"]);
            sessionStorage.setItem("vacations", JSON.stringify(vacations));
          }
        });
    };

    sendData();
    deleteFormDataFromCache();
    sessionStorage.removeItem("vacation");
    navigate("/vacations", { replace: true });
  };

  const onUpdate = () => {
    const sendData = async () => {
      await fetch("http://localhost:8080/v1/vacations/" + newVacation.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vac: newVacation }),
      })
        .then((response) => response.json())
        .then((vac) => {
          const localVacations = sessionStorage.getItem("vacations");
          if (localVacations) {
            let vacations: IVacation[] = JSON.parse(localVacations);
            let truncatedData = vacations.filter((v) => v.id !== vac.id);
            truncatedData.push(vac["vac"]);
            sessionStorage.setItem("vacations", JSON.stringify(truncatedData));
          }
        });
    };

    sendData();
    deleteFormDataFromCache();
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
              setNewVacaiton({
                ...newVacation,
                emp_id: Number.parseInt(e.target.value),
              });
              setSelectedEmployee(Number.parseInt(e.target.value));
            }}
          >
            <option value="-1" disabled>
              Выберите сотрудника
            </option>
            {employees!.map((emp) => (
              <option key={emp.id} value={emp.id.toString()}>
                {emp.last_name} {emp.first_name} {emp.patronymic}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Начало:</label>
          <input
            className="form-control"
            value={newVacation.start_date}
            onChange={(e) => {
              setNewVacaiton({
                ...newVacation,
                start_date: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Конец:</label>
          <input
            className="form-control"
            value={newVacation.end_date}
            onChange={(e) => {
              setNewVacaiton({
                ...newVacation,
                end_date: e.target.value,
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

export default VacationForm;
