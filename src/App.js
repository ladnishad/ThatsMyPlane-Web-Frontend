import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import useAuth from "./hooks/useAuth"
import { PublicRoutes, PrivateRoutes } from "./routes"
import RequireAuth from "./pages/components/RequireAuth"
import PersistLogin from "./pages/components/PersistLogin"
import Layout from "./pages/components/Layout"
import './App.css';

const App = () => {
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
    <Routes>
      <Route path="/" element={<Layout />}>
      {publicRoutes}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Navigate  to="/home" replace />} />
            {privateRoutes}
          </Route>
        </Route>
        <Route path="*" element={<Navigate  to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
