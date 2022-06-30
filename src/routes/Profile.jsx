import { auth } from 'myFirebase';
import { signOut } from 'myFirebase';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onSignOutClick = () => {
    signOut(auth);
    history.push('/');
  };
  return (
    <>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
};

export default Profile;
