import { dbService } from 'myFirebase';
import { doc, deleteDoc } from 'firebase/firestore';

const Nweet = ({ nweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      const NweetTextRef = doc(dbService, 'nweets', nweetObj.id);
      await deleteDoc(NweetTextRef);
    }
  };
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
