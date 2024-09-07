import { TerrainType } from '@/types';

export interface Tile {
  terrainType: TerrainType;
  height: number;
}

export interface HeightmapTile {
  height: number;
}

export interface Grid {
  width: number;
  height: number;
  map: Tile[][];
}
