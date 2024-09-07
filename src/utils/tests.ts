/**
 * Calculates the difference between the instigator and the opposition.
 * @param instigator - The first value, typically representing an attack or action.
 * @param opposition - The second value, typically representing defense or resistance.
 * @returns The difference between the instigator and opposition.
 */
export function findDifference(instigator: number, opposition: number) {
  return instigator - opposition;
}

/**
 * Calculates the difference between the instigator and the opposition,
 * with an optional minimum threshold for the result.
 * @param instigator - The first value, typically representing an attack or action.
 * @param opposition - The second value, typically representing defense or resistance.
 * @param An optional minimum threshold for the result. If provided,
 * the result will not go below this minimum value.
 * @returns The difference between instigator and opposition, or the minimum value if the difference is less than the minimum.
 */
export function findDifferenceWithMinimum(instigator: number, opposition: number, minimum?: number) {
  const difference = findDifference(instigator, opposition);
  return minimum ? (difference > minimum ? difference : minimum) : difference;
}
