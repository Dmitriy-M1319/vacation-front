import React from "react";
import { IEmployee } from "../../models";

interface EmployeeProps {
    employee: IEmployee
}

function Employee(props: EmployeeProps){
    return (
        <div className="row">
            <div className="col-12">
                <div className="fw-bold">Сотрудник №{ props.employee.id }</div>
                <p>Фамилия: { props.employee.lastName }</p>
                <p>Имя: { props.employee.firstName }</p>
                <p>Отчество: { props.employee.patronymic }</p>
            </div>
        </div>
    )
}

export default Employee;