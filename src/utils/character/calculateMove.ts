export function calculateMove(dexterity: number, strength: number) {
  return dexterity + Math.floor(strength / 2);
}
