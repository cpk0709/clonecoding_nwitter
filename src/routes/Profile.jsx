import { auth, dbService } from 'myFirebase';
import { signOut } from 'myFirebase';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onSignOutClick = () => {
    signOut(auth);
    history.push('/');
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
};

export default Profile;
