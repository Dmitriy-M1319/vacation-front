import React from "react";
import AppRouter from "./router/AppRouter";
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <header className="bg-primary text-white p-3">
        <h1>Vacation App</h1>
        <nav>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/employees">
                Сотрудники
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/vacations">
                Отпуска
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
        <AppRouter />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
