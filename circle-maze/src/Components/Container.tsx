import { FC, useState } from 'react';

import { Circle } from './Circle.tsx';
import { DrawArea } from './DrawArea.tsx';
import { CartesianCoord2D, PolarCoord2D } from './Utils.ts';

/** TContainer component */
export const Container: FC = () => {
  const maxPoints = 500;
  const [points, setPoints] = useState<CartesianCoord2D[]>([]);

  const addPoint = (point: CartesianCoord2D) => {
    let newPoints = points.map(p => p);
    newPoints.push(point);

    // Limit points
    if (newPoints.length > maxPoints) {
      newPoints = newPoints.slice(newPoints.length - maxPoints, newPoints.length - 1);
    }

    setPoints(newPoints);
  };

  const drawFrequency = 60;

  const r1 = 80;
  const r2 = r1 / 3;
  const r3 = r2 / 3;

  const c1: PolarCoord2D = { radius: 0, angle: 0 };
  const c2: PolarCoord2D = { radius: r1 + r2, angle: 0 };
  const c3: PolarCoord2D = { radius: r2 + r3, angle: 0 };

  const w1 = -120;
  const w2 = w1 * -3 * 0.5;
  const w3 = w2 * -3 * 0.5;

  return (
    <div className="w-full bg-gray-400 flex gap-x-2 h-screen">
      <div className="relative w-60 h-60 outline pl-32 pt-32">
        <Circle
          radius={r1}
          center={c1}
          angularVelocity={w1}
          startAngle={0}
          className='bg-blue-500 bg-opacity-50 relative'
          frequency={drawFrequency}
        >
          <Circle
            radius={r2}
            center={c2}
            angularVelocity={w2}
            startAngle={0}
            className='bg-green-500 bg-opacity-50'
            enableRoll={true}
            frequency={drawFrequency}
            onUpdate={addPoint}
          >
            <Circle
              radius={r3}
              center={c3}
              angularVelocity={w3}
              startAngle={0}
              className='bg-orange-500 bg-opacity-50'
              enableRoll={true}
              frequency={drawFrequency}
            />
          </Circle>
        </Circle>
        <DrawArea points={points} />
      </div>
    </div>
  )
}
