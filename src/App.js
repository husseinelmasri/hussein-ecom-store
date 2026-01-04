import './App.scss';
import NavBar from './components/navbar/navbar';
import Store from './pages/store';
import Cart from './pages/cart';
import Authenticate from './pages/authenticate';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'utilities/firebaseConfig';
import { MainContext } from 'utilities/context';
import { fetchUserData } from 'utilities/firebaseFunctions';

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    user && fetchUser();
  }, [user]);

  const fetchUser = async () => {
    const res = await fetchUserData(user);
    if (res.success) {
      console.log(res.data);
    }
  };

  return (
    <MainContext.Provider value={{ user, loading }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
