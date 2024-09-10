/**
 * This function calculates the Manhattan distance (L1 norm) between two points (x1, y1) and (x2, y2).
 * The Manhattan distance is the sum of the absolute differences between the coordinates of the points.
 *
 * In high-dimensional spaces, the Manhattan distance is often more suitable than Euclidean distance for data mining
 * tasks due to its ability to maintain more meaningful proximity measures, as described in the paper
 * "On the Surprising Behavior of Distance Metrics in High Dimensional Space" by Charu C. Aggarwal et al.
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 *
 * @returns {number} - The calculated Manhattan distance between the two points.
 */
export const calculateManhattanDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * This function calculates the Manhattan distance (L1 norm) between two points (x1, y1) and (x2, y2),
 * taking into account the height difference between the points.
 *
 * The Manhattan distance is the sum of the absolute differences between the coordinates of the points.
 * The height difference is also included in this sum.
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} h1 - The height (z-coordinate) of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @param {number} h2 - The height (z-coordinate) of the second point.
 *
 * @returns {number} - The calculated Manhattan distance between the two points, considering height.
 */
export const calculateManhattanDistanceWithHeight = (
  x1: number,
  y1: number,
  h1: number,
  x2: number,
  y2: number,
  h2: number
): number => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(h1 - h2);
};

/**
 * This function calculates the Euclidean distance (L2 norm) between two points (x1, y1) and (x2, y2),
 * taking into account the height difference between the points.
 *
 * The Euclidean distance is the straight-line distance between two points in 3D space, calculated
 * using the square root of the sum of the squared differences of the coordinates and height.
 *
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} h1 - The height (z-coordinate) of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @param {number} h2 - The height (z-coordinate) of the second point.
 *
 * @returns {number} - The calculated Euclidean distance between the two points, considering height.
 */
export const calculateEuclideanDistanceWithHeight = (
  x1: number,
  y1: number,
  h1: number,
  x2: number,
  y2: number,
  h2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(h2 - h1, 2));
};
