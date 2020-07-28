import { Character } from './character';

export class CharacterDataContainer {
  count: number;
  limit: number;
  offset: number;
  results: Character[];
  total: number;
}
