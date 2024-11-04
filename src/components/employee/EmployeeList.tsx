import React from "react";
import { IEmployee } from "../../models";
import Employee from "./Employee";

function EmployeeList() {

    const data: IEmployee[] = [
            {
              id: 1,
              firstName: 'Анна',
              lastName: 'Иванова',
              patronymic: 'Андреевна',
            },
            {
              id: 2,
              firstName: 'Ольга',
              lastName: 'Иванова',
              patronymic: 'Владимировна',
            },
            {
              id: 3,
              firstName: 'Наталья',
              lastName: 'Петрова',
              patronymic: 'Сергеевна',
            },
            {
              id: 4,
              firstName: 'Анна',
              lastName: 'Смирнова',
              patronymic: 'Александровна',
            },
    ];
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {data.map((e: IEmployee, index: number) => (
                        <Employee employee={e} />
                    ))}
                </div>
            </div>
        </div>
    ) 
}

export default EmployeeList;