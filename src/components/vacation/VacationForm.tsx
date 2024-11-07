import React, { useState } from "react";
import { useLocation } from "react-router";

interface VacationFormProps {
  created: boolean;
}

function VacationForm({ created }: VacationFormProps) {
  const data = useLocation();
  const [newVacation, setNewVacaiton] = useState(data.state);

  const onCreate = () => {
    console.log("создать объект " + newVacation);
  };

  const onUpdate = () => {
    console.log("Обновить объект " + newVacation);
  };

  return (
    <div className="card m-3">
      <div className="card-header">
        {created ? <h4>Создать отпуск</h4> : <h4>Редактировать отпуск</h4>}
      </div>
      <div className="card-body">
        {/* <div className="mb-3">
          <label className="form-label">Сотрудник:</label>
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
        </div> */}
        <div className="mb-3">
          <label className="form-label">Начало:</label>
          <input
            className="form-control"
            value={newVacation.startDate}
            onChange={(e) =>
              setNewVacaiton({
                ...newVacation,
                startdATE: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Конец:</label>
          <input
            className="form-control"
            value={newVacation.endDate}
            onChange={(e) =>
              setNewVacaiton({
                ...newVacation,
                endDate: e.target.value,
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

export default VacationForm;
