import './Circle.css';

import { createRef, FC, PropsWithChildren, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { CartesianCoord2D, PolarCoord2D } from './Utils';

/** The props for the Circle component */
export interface CircleProps {
  /** The radius */
  radius: number;
  /** The coordinates of the center */
  center?: PolarCoord2D,
  /** The starting rotation angle */
  startAngle?: number;
  /** The angular velocity [degrees/second] */
  angularVelocity?: number;
  /** Whether the circle rolls */
  enableRoll?: boolean;
  /** The frequency at which to call the onUpdate callback */
  frequency?: number;
  /** Callback fired at the given frequency */
  onUpdate?: (point: CartesianCoord2D) => void;
  /** Optional class names */
  className?: string;
}

export const Circle: FC<PropsWithChildren<CircleProps>> = ({
  children,
  className,
  center = { radius: 0, angle:0 },
  radius,
  startAngle = 0,
  angularVelocity = 0,
  enableRoll = false,
  frequency = 0,
  onUpdate,
}) => {
  const pointRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const updateInterval = frequency > 0 && onUpdate
      ? setInterval(() => {
        const boudingRect = pointRef.current?.getBoundingClientRect();
        const x = boudingRect?.right;
        const y = boudingRect?.top;
        x && y && onUpdate({ x, y });
      }, (1 / frequency) * 1000)
      : null;

    return () => {
      updateInterval !== null && clearInterval(updateInterval);
    };
  }, [frequency, onUpdate, pointRef]);
  
  const circumference = radius * 2 * Math.PI;
  const rollCircumference = (center.radius - radius) * 2 * Math.PI;
  const rollAngularVelocity = enableRoll ? ((angularVelocity / 360) * circumference / rollCircumference) * 360 : 0;
  return (
    <div
      style={{
        'animationName': 'rotate',
        'animationDuration': `${rollAngularVelocity === 0 ? 0: 360/Math.abs(rollAngularVelocity)}s`,
        'animationIterationCount': 'infinite',
        'animationDirection': rollAngularVelocity >=0 ? 'normal' : 'reverse',
        'animationTimingFunction': 'linear',
      }}
    >
      <div
        className={twMerge('rounded-full relative ease-linear outline-2 outline-gray-600 outline -outline-offset-1 transition duration-500', className)}
        style={{
          'height': radius * 2,
          'width': radius * 2,
          'transform': `rotate(${startAngle}deg)`,
          'marginLeft': -radius + (center.radius * Math.cos(center.angle * (Math.PI / 180))),
          'marginTop': -radius + (center.radius * Math.sin(center.angle * (Math.PI / 180))),
          'padding': radius,
          'animationName': 'rotate',
          'animationDuration': `${angularVelocity === 0 ? 0: 360/Math.abs(angularVelocity)}s`,
          'animationIterationCount': 'infinite',
          'animationDirection': angularVelocity >=0 ? 'normal' : 'reverse',
          'animationTimingFunction': 'linear',
        }}
      >
        <div className="absolute flex border-y border-black w-1/2 top-1/2 right-0" >
          <div ref={pointRef} className="ml-auto" />
        </div>
        {children}
      </div>
    </div>
  )
};