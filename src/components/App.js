import Routers from './Routers';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Routers isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter{new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
