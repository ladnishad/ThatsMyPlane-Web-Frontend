import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";

import { makeStyles } from '@mui/styles';

import { RoutesForApp } from "./routes"
import { HeaderComponent } from "./pages/components/AppHeader/HeaderComponent"
import { BottomNavigationComponent } from "./pages/components/AppFooter/FooterComponent"

import './App.css';

const AppStyles = makeStyles((theme) => ({
  appBarSpace: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    height: "80vh",
    overflow: "auto",
  },
}))

const App = () => {


  const classes = AppStyles();

  const routes = RoutesForApp.map(({ path, element }) => (
    <Route
      key={path}
      path={path}
      element={element}
    />
  ))

  return (
    <div>
      <HeaderComponent />
      <main className={classes.content}>
        <div className={classes.appBarSpace} />
          <Routes>
              <Route exact path="/" element={<Navigate  to="/home" replace />} />
              <Route path="*" element={<Navigate  to="/home" replace />} />
              {routes}
          </Routes>
        <BottomNavigationComponent />
        </main>
    </div>
  );
}

export default App;
