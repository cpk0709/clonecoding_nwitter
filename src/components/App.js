import Routers from 'components/Routers';
import { useState } from 'react';
import { auth } from 'myFirebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <>
      <Routers isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
