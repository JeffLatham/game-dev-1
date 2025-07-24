import { FC, useEffect, useState } from 'react';

import { CartesianCoord2D, generateSvgPathString } from './Utils.ts';

/** The props for the Circle component */
export interface DrawAreaProps {
  /** The points of the path to draw */
  points: CartesianCoord2D[];
}

export const DrawArea: FC<DrawAreaProps> = ({ points }) => {
  const [pathString, setPathString] = useState(generateSvgPathString(points));

  useEffect(() => setPathString(generateSvgPathString(points)), [points]);

  return (
    <div className=" absolute top-0 left-0">
      <svg width="full" height="full" version="1.1" viewBox="0 0 240 240" className="overflow-visible">
        <path d={pathString} fill="none" stroke="#f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  );
};
