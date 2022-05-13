import { Routes, Route } from 'react-router-dom';
import { Activity } from '../components/pages/Activity/Activity';
import { Employee } from '../components/pages/Employee/Employee';
import { Home } from '../components/pages/Home/Home';
import { Profile } from '../components/pages/Profile/Profile';
import { paths } from './paths';

export const Routing = () => {
  return (
    <Routes>
      <Route path={paths.HOME} element={<Home />}>
        <Route path={paths.PROFILE} element={<Profile />} />
        <Route path={paths.EMPLOYEE} element={<Employee />} />
        <Route path={paths.ACTIVITY} element={<Activity />} />
        {/* <Route path={paths.PROFILE} element={<Profile />} /> */}
      </Route>
    </Routes>
  )
}