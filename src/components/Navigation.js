import { Link } from 'react-router-dom';
import { Profile } from 'routes';
const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/profile'>My Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
