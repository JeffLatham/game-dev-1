import { FC, useState } from 'react';

import { Circle } from './Circle.tsx';
import { DrawArea } from './DrawArea.tsx';
import { CartesianCoord2D } from './Utils.ts';

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

  return (
    <div className="w-full bg-gray-400 flex gap-x-2 h-screen">
      <div className="relative w-60 h-60 outline pl-32 pt-32">
        <Circle
          radius={80}
          startAngle={0}
          angularVelocity={35}
          className='bg-blue-500 bg-opacity-50 relative'
        >
          <Circle
            center={{ radius: 80+20, angle: 0 }}
            radius={20}
            startAngle={0}
            angularVelocity={-40}
            className='bg-green-500 bg-opacity-50'
            enableRoll={true}
            frequency={60}
            onUpdate={addPoint}
          >
            <Circle
              center={{ radius: 20+10, angle: 0 }}
              radius={10}
              startAngle={0}
              angularVelocity={-60}
              className='bg-orange-500 bg-opacity-50'
              enableRoll={true}
            />
          </Circle>
        </Circle>
        <DrawArea points={points} />
      </div>
    </div>
  )
}
