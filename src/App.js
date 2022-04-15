import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";

import { RoutesForApp } from "./routes"
import PrimarySearchAppBar from "./pages/components/Header"
import './App.css';

const App = () => {

  const routes = RoutesForApp.map(({ path, element: Component }) => (
    <Route
      key={path}
      path={path}
      render={(props) => (
        <Component
          {...props}
        />
      )}
    />
  ))

  return (
    <div className="App">
      <PrimarySearchAppBar />
        <Router>
          <Routes>
              <Route exact path="/" render={() => <Navigate  to="/home" />} />
              {routes}
              <Route render={() => <span>Invalid route</span>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
