import './Circle.css';

import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { PolarCoord2D } from './Utils';

/** The props for the Circle component */
export interface CircleProps {
  /** Optional class names */
  className: string;
  /** The coordinates of the center */
  center?: PolarCoord2D,
  /** The radius */
  radius: number;
  /** The starting rotation angle */
  startAngle?: number
  /** The angular velocity [degrees/second] */
  angularVelocity?: number;
}

export const Circle: FC<PropsWithChildren<CircleProps>> = ({
  children,
  className,
  center = { radius: 0, angle:0 },
  radius,
  startAngle = 0,
  angularVelocity = 0,
}) => {  
  return (
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
      <div className="absolute border-y border-black w-1/2 top-1/2 right-0" />
      {children}
    </div>
  )
};