import { Routes, Route, Navigate } from 'react-router-dom';
// import { Home } from '../components/pages/Home/Home';
import { Login } from '../components/pages/Login/Login';
import { paths } from './paths';
import { Home as DashboardHome } from '../components/pages/Dashboard/Home/Home';
import { ViewFilePage } from '../components/pages/Viewfile';

export const Routing = () => {
  return (
    <Routes>
      <Route path={paths.HOME}  element={<Navigate to={paths.LOGIN} replace />} />
      <Route path={paths.DASHBOARD} element={<DashboardHome />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path={'/view-file/:type/:id'} element={<ViewFilePage />} />

      <Route path='*' element={
        <div style={{ top: 0, bottom: 0, margin: 0 }}>
          <h2>Not Found :(</h2>
        </div>
      }/>
    </Routes>
  )
}