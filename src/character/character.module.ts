import { Module } from '@nestjs/common';

import { CharacterService } from './services/character.service';

@Module({
  providers: [CharacterService]
})
export class CharacterModule {}
