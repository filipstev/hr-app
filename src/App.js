import './App.css';
import JoinRoutes from './routes/JoinRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as userActions from './store/actions/user';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const checkJwtValid = (exp) => {
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  };
  
  useEffect(() => {
    console.log(localStorage.getItem('user'));
    let decoded;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      decoded = jwtDecode(user.jwt);
      if (checkJwtValid(decoded.exp)) {
        console.log('valid!');
        dispatch(userActions.setUser(user));
      } else {
        // dispatch(userActions.tokenInvalid());
        console.log('Not valid!');
      }
    } else {
      console.log('No user');
    }
  }, []);

  return (
    <div className="App">{!isLoggedIn ? <JoinRoutes /> : <AdminRoutes />}</div>
  );
}

export default App;
