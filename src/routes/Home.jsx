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
    const dbNweets = query(collection(dbService, 'nweets'));
    console.log(dbNweets);
  };
  useEffect(() => {
    getNweets();
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      nweet,
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
  );
};

export default Home;
