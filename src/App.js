import './App.css';
import JoinRoutes from './routes/JoinRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">{!isLoggedIn ? <JoinRoutes /> : <AdminRoutes />}</div>
  );
}

export default App;
