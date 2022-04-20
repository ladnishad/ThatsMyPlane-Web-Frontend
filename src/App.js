import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";

import { RoutesForApp } from "./routes"
import { HeaderComponent } from "./pages/components/AppHeader/HeaderComponent"
import { BottomNavigationComponent } from "./pages/components/AppFooter/FooterComponent"

import './App.css';

const App = () => {

  const routes = RoutesForApp.map(({ path, element }) => (
    <Route
      key={path}
      path={path}
      element={element}
    />
  ))

  return (
    <div className="App">
      <HeaderComponent />
          <Routes>
              <Route exact path="/" element={<Navigate  to="/home" replace />} />
              <Route path="*" element={<Navigate  to="/home" replace />} />
              {routes}
              <Route render={() => <span>Invalid route</span>} />
          </Routes>
        <BottomNavigationComponent />
    </div>
  );
}

export default App;
