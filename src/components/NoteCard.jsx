import React, { useEffect, useRef, useState } from 'react';
import Trash from '../Icons/Trash';

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  const textAreaRef = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = 'auto';
    current.style.height = current.scrollHeight + 'px';
  }
  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          name=""
          id=""
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
