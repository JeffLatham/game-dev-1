import { FC } from 'react';

import { Circle } from './Circle.tsx';

/** TContainer component */
export const Container: FC = () => {
  return (
    <div className="w-full bg-gray-400 flex gap-x-2 h-screen">
      <div className="relative w-60 h-60 outline pl-32 pt-32">
        <Circle
          radius={80}
          startAngle={-10}
          angularVelocity={-10}
          className='bg-blue-500 bg-opacity-50 relative'
        >
          <Circle
            center={{ radius: 80+20, angle: 60 }}
            radius={20}
            startAngle={0}
            angularVelocity={40}
            className='bg-green-500 bg-opacity-50'
          >
            <Circle
              center={{ radius: 20+10, angle: -100 }}
              radius={10}
              startAngle={20}
              angularVelocity={-90}
              className='bg-orange-500 bg-opacity-50'
            />
          </Circle>
        </Circle>
      </div>
    </div>
  )
}
