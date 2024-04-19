/* eslint-disable no-param-reassign */
import Alpine from 'alpinejs';
import Lottie from 'lottie-web/build/player/lottie_light';

Alpine.start();
window.lottie = Lottie;

const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape) => {
  const {
    top, bottom, left, right,
  } = shape.getBoundingClientRect();

  shape.origLeft = left;
  shape.origTop = top;
  shape.origRight = right;
  shape.origBottom = bottom;
  shape.shapeCenterX = (left + right) / 2;
  shape.shapeCenterY = (top + bottom) / 2;

  const rotationRegex = shape.classList.toString().match(/(-?)rotate-(\d+)/);
  shape.origRotation = rotationRegex ? `${rotationRegex[1]}${rotationRegex[2]}deg` : '0deg';
});

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;

  shapes.forEach((shape) => {
    const {
      origTop, origBottom, origLeft, origRight, origRotation, shapeCenterX, shapeCenterY
    } = shape;

    const dx = clientX - shapeCenterX;
    const dy = clientY - shapeCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.log(4) / (distance * Math.exp(-3));

    shape.style.transform = `translate(${dx * pull}px, ${dy * pull}px) rotate(${origRotation})`;
  });
});
