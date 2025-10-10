import { BrowserWindow } from "electron";

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};

const TRANSITION_DURATION = 300; // milliseconds
const TRANSITION_FPS = 60; // frames per second
const FRAME_DURATION = 1000 / TRANSITION_FPS;
export function animateWindowTransition(
  window: BrowserWindow,
  targetSize: { width: number; height: number },
  targetPosition: { x: number; y: number },
  targetOpacity: number,
  duration: number = TRANSITION_DURATION
) {
  const startSize = window.getSize() as [number, number];
  const startPosition = window.getPosition() as [number, number];
  const startOpacity = window.getOpacity();

  const sizeDelta = {
    width: targetSize.width - startSize[0],
    height: targetSize.height - startSize[1],
  };

  const positionDelta = {
    x: targetPosition.x - startPosition[0],
    y: targetPosition.y - startPosition[1],
  };

  const opacityDelta = targetOpacity - startOpacity;

  const totalFrames = Math.ceil(duration / FRAME_DURATION);
  let currentFrame = 0;

  const animate = () => {
    if (currentFrame >= totalFrames) {
      // Ensure final values are exact
      window.setSize(targetSize.width, targetSize.height);
      window.setPosition(targetPosition.x, targetPosition.y);
      window.setOpacity(targetOpacity);
      return;
    }

    // Easing function (ease-out)
    const progress = currentFrame / totalFrames;
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentSize = {
      width: Math.round(startSize[0] + sizeDelta.width * easedProgress),
      height: Math.round(startSize[1] + sizeDelta.height * easedProgress),
    };

    const currentPosition = {
      x: Math.round(startPosition[0] + positionDelta.x * easedProgress),
      y: Math.round(startPosition[1] + positionDelta.y * easedProgress),
    };

    const currentOpacity = startOpacity + opacityDelta * easedProgress;

    window.setSize(currentSize.width, currentSize.height);
    window.setPosition(currentPosition.x, currentPosition.y);
    window.setOpacity(currentOpacity);

    currentFrame++;
    setTimeout(animate, FRAME_DURATION);
  };

  animate();
}
