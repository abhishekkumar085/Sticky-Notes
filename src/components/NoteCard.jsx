import React, { useEffect, useRef, useState } from 'react';
import Trash from '../Icons/Trash';
import { newOffset, autoGrow, setZIndex } from '../Utils/utils';

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  const textAreaRef = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const mouseup = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener('mousemove', mouseMove);
  };

  // mouse move event
  const mouseMove = (e) => {
    // Calculate the mouse direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    // update the start position for the next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // update the card top and left position

    const newPosition = newOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  };

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };
  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  return (
    <div
      ref={cardRef}
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
        onMouseDown={mouseDown}
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
            setZIndex(cardRef.current)
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
