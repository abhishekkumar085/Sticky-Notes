import React, { useContext, useRef } from 'react';
import Plus from '../Icons/Plus';
import color from '../assets/color.json';
import { db } from '../AppWrite/databases';
import { NoteContext } from '../Context/NoteContext';

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  const startingPos = useRef(10);
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(color[0]),
    };
    startingPos.current += 10;
    const response = await db.notes.create(payload);
    console.log(response);
    setNotes((prevState) => [response, ...prevState]);
  };
  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
