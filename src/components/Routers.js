import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Home, Profile } from '../routes';
import Navigation from 'components/Navigation';

const Routers = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default Routers;
