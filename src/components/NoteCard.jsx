import React from 'react';
import Trash from '../Icons/Trash';

const NoteCard = ({ note }) => {
  let position = JSON.parse(note.position);
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
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
          name=""
          id=""
          style={{ color: colors.colorText }}
          defaultValue={body}
        ></textarea>
      </div>
      {body}
    </div>
  );
};

export default NoteCard;
