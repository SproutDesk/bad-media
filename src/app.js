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
  if (rotationRegex) {
    shape.origRotation = rotationRegex ? rotationRegex[2] : '0';
    shape.origRotationClockwise = rotationRegex[1] !== '-';
  } else {
    shape.origRotation = '0';
    shape.origRotationClockwise = true;
  }
});

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;

  shapes.forEach((shape) => {
    const {
      origRotation, origRotationClockwise, shapeCenterX, shapeCenterY,
    } = shape;

    const dx = clientX - shapeCenterX;
    const dy = clientY - shapeCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.log(4) / (distance * Math.exp(-3.2));

    const maxAngle = 30;
    const rotation = Math.min(
      parseInt(origRotation, 10) + ((maxAngle / distance) * 100),
      maxAngle,
    ) * (origRotationClockwise ? 1 : -1);

    shape.style.transform = `translate(${dx * pull}px, ${dy * pull}px) rotate(${rotation}deg)`;
  });
});
