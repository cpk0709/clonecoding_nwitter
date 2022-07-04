import { useState } from 'react';
import { dbService } from 'myFirebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
} from 'firebase/firestore';
import { useEffect } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const q = query(collection(dbService, 'nweets'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      text: nweet,
      createdAt: serverTimestamp(),
    });
    setNweet('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={nweet}
            onChange={onChange}
            type='text'
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type='submit' value='Nweet' />
        </form>
      </div>
      {nweets.map((nweet, index) => {
        return (
          <div key={index}>
            <h4>{nweet.nweet}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Home;
