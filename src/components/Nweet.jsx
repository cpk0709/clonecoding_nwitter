import { dbService, storageService } from 'myFirebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ref, deleteObject } from 'firebase/storage';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  // 삭제하려는 이미지 파일을 가리키는 ref 생성
  // nweetObj의 attachmentUrl이 바로 삭제하려는 그 url이다
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      try {
        const NweetTextRef = doc(dbService, 'nweets', nweetObj.id);
        const desertRef = ref(storageService, nweetObj.attachmentUrl);
        await deleteDoc(NweetTextRef);
        await deleteObject(desertRef);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  // Edit
  const onSubmit = async (event) => {
    event.preventDefault();
    const NweetTextRef = doc(dbService, 'nweets', nweetObj.id);
    await updateDoc(NweetTextRef, { text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type='text'
                  placeholder='Edit your nweet'
                  value={newNweet}
                  onChange={onChange}
                  required
                />
                <input type='submit' value='update Nweet' />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              alt='nweet img'
              src={nweetObj.attachmentUrl}
              width='50px'
              height='50px'
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
