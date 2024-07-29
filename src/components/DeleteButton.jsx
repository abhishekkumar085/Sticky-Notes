import React, { useContext } from 'react';
import Trash from '../Icons/Trash';
import { db } from '../AppWrite/databases';
import { NoteContext } from '../Context/NoteContext';

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);
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
