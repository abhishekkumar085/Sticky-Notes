import React, { useEffect, useState } from 'react';
// import { fakeData as notes } from '../assets/fakeData';
import { db } from '../AppWrite/databases';
import { databases } from '../AppWrite/config';
import NoteCard from '../components/NoteCard';
const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
  };
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};

export default NotesPage;
