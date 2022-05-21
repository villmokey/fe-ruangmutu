import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/pages/Home/Home';
import { Login } from '../components/pages/Login/Login';
import { paths } from './paths';

export const Routing = () => {
  return (
    <Routes>
      <Route path={paths.HOME} element={<Home />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path='*' element={
        <div style={{ top: 0, bottom: 0, margin: 0 }}>
          <h2>Not Found :(</h2>
        </div>
      }/>
    </Routes>
  )
}