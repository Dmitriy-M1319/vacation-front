import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeForm from "../components/employee/EmployeeForm";
import VacationList from "../components/vacation/VacationList";
import VacationForm from "../components/vacation/VacationForm";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="employees" element={<EmployeeList />} />
        <Route
          path="employees/create"
          element={<EmployeeForm created={true} />}
        />
        <Route
          path="employees/update"
          element={<EmployeeForm created={false} />}
        />
        <Route path="vacations" element={<VacationList />} />
        <Route
          path="vacations/create"
          element={<VacationForm created={true} />}
        />
        <Route
          path="vacations/update"
          element={<VacationForm created={false} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
