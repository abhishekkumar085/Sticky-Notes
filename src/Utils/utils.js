export const newOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetLeft < 0 ? 0 : offsetTop,
  };
};
// Auto grow function
export function autoGrow(textAreaRef) {
  const { current } = textAreaRef;
  current.style.height = 'auto';
  current.style.height = current.scrollHeight + 'px';
}

// active card z-index
export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName('card')).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};
// Body Parser
export const bodyParser = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
