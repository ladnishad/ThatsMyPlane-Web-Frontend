import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import useAuth from "./hooks/useAuth"
import { PublicRoutes, PrivateRoutes } from "./routes"
import RequireAuth from "./pages/components/RequireAuth"
import { HeaderComponent } from "./pages/components/AppHeader/HeaderComponent"
import { BottomNavigationComponent } from "./pages/components/AppFooter/FooterComponent"
import Layout from "./pages/components/Layout"
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
  const { auth } = useAuth()
  const publicRoutes = PublicRoutes.map(({ path, element }) => (
    <Route
      key={path}
      path={path}
      element={element}
    />
  ))

  const privateRoutes = PrivateRoutes.map(({ path, element }) => (
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
      <Route path="/" element={<Navigate  to="/home" replace />} />
      {publicRoutes}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Navigate  to="/home" replace />} />
        {privateRoutes}
      </Route>
      <Route path="*" element={<Navigate  to="/home" replace />} />
    </Routes>
    {auth.user && (<BottomNavigationComponent />)}
    </main>
    </div>
  );
}

export default App;
