/** The x and y coordinates of an element */
export interface CartesianCoord2D {
  x: number,
  y: number,
}

/** The x and y coordinates of an element */
export interface PolarCoord2D {
  /** The radius */
  radius: number,
  /** The angle [degrees] */
  angle: number,
}

export const generateSvgPathString = (points: CartesianCoord2D[]) => {
  let pathString = '';
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      pathString += 'm ';
    } else if (i === 1) {
      pathString += 'l ';
    }
    pathString += `${points[i].x - (i > 0 ? points[i - 1].x : 0)} ${points[i].y - (i > 0 ? points[i - 1].y : 0)} `;
  }
  return pathString;
};