import { dbService } from 'myFirebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      const NweetTextRef = doc(dbService, 'nweets', nweetObj.id);
      await deleteDoc(NweetTextRef);
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
