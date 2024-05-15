import { Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ListUserPage from './views/admin/users/list/ListUserPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<ListUserPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
