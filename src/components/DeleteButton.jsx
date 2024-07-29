import React from 'react';
import Trash from '../Icons/Trash';
import { db } from '../AppWrite/databases';

const DeleteButton = ({ noteId, setNotes }) => {
  const handleDelete = (e) => {
    db.notes.delete(noteId);
    setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
  };
  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
