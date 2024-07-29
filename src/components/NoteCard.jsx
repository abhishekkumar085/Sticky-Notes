import React, { useEffect, useRef, useState } from 'react';
import Trash from '../Icons/Trash';
import { newOffset, autoGrow, setZIndex, bodyParser } from '../Utils/utils';
import { db } from '../AppWrite/databases';
import Spinner from '../Icons/Spinner';

const NoteCard = ({ note }) => {
  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  const textAreaRef = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);

  const keyUpTimer = useRef(null);

  const handleKeyUp = async () => {
    // first initiate saving

    setSaving(true);

    // if we have a timer id, clear it so we can add another two seconds

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    // Set timer to trigger save in 2 seconds

    keyUpTimer.current = setTimeout(() => {
      saveData('body', textAreaRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };
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

    const newPosition = newOffset(cardRef.current); //{x,y}
    saveData('position', newPosition);
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
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          name=""
          id=""
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
