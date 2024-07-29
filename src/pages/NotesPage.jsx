import React, { useContext, useEffect, useState } from 'react';
import { db } from '../AppWrite/databases';
import NoteCard from '../components/NoteCard';
import { NoteContext } from '../Context/NoteContext';
import Controls from '../components/Controls';

const NotesPage = () => {
  const { notes, setNotes } = useContext(NoteContext);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls/>
    </div>
  );
};

export default NotesPage;
