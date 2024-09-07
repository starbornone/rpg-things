import { updateHealth, updateMap } from '@/store/slices/npcSlice';
import { Dispatch } from 'react';

export const handleHealthUpdate = (id: string, newHealth: number, dispatch: Dispatch<any>) => {
  dispatch(updateHealth({ id, newHealth }));
};

export const handleMapUpdate = (
  id: string,
  newX: number,
  newY: number,
  remainingMoves: number,
  dispatch: Dispatch<any>
) => {
  dispatch(updateMap({ id, newX, newY, remainingMoves }));
};
