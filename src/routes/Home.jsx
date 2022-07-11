import { useState } from 'react';
import { dbService } from 'myFirebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  // getDocs,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { useEffect } from 'react';
import Nweet from 'components/Nweet';
import { storageService } from 'myFirebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  // const getNweets = async () => {
  //   const q = query(collection(dbService, 'nweets'));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setNweets((prev) => [nweetObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
      console.log(attachmentUrl);
    }

    // await addDoc(collection(dbService, 'nweets'), {
    //   text: nweet,
    //   createdAt: serverTimestamp(),
    //   creatorId: userObj.uid,
    // });
    // setNweet('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  // 파일 선택시
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  // 이미지 클린
  const onClearAttachmentClick = () => setAttachment(null);
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
          <input type='file' accept='image/*' onChange={onFileChange} />
          <input type='submit' value='Nweet' />
          {attachment && (
            <div>
              <img
                src={attachment}
                alt='previewImage'
                width='50px'
                height='50px'
              />
              <button onClick={onClearAttachmentClick}>Clear</button>
            </div>
          )}
        </form>
      </div>
      {nweets.map((nweet) => {
        return (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        );
      })}
    </>
  );
};

export default Home;
