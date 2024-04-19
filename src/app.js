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

  const shapeCenterX = (left + right) / 2;
  const shapeCenterY = (top + bottom) / 2;

  shape.origLeft = left;
  shape.origTop = top;
  shape.origRight = right;
  shape.origBottom = bottom;
  shape.shapeCenterX = shapeCenterX;
  shape.shapeCenterY = shapeCenterY;

  const rotationRegex = shape.classList.toString().match(/(-?)rotate-(\d+)/);
  shape.origRotation = rotationRegex ? `${rotationRegex[1]}${rotationRegex[2]}deg` : '0deg';
});

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;

  shapes.forEach((shape) => {
    const {
      origTop, origBottom, origLeft, origRight, origRotation,
    } = shape;

    const shapeCenterX = (origLeft + origRight) / 2;
    const shapeCenterY = (origTop + origBottom) / 2;

    const dx = clientX - shapeCenterX;
    const dy = clientY - shapeCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const pull = Math.log(4) / (distance * Math.exp(-3)); // Max pull of 60px

    shape.style['transition-property'] = 'transform';
    shape.style['will-change'] = 'transform';
    shape.style['transition-timing-function'] = 'ease-out';
    shape.style['transition-duration'] = '250ms';
    // shape.style['transform-origin'] = `${shapeCenterX}px ${shapeCenterY}px`;
    shape.style.transform = `translate(${dx * pull}px, ${dy * pull}px) rotate(${origRotation})`;
  });
});
