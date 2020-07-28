import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { CharacterController } from './controllers/character.controller';
import { CharacterService } from './services/character.service';

@Module({
  imports: [ DatabaseModule, SharedModule ],
  providers: [ CharacterService ],
  controllers: [ CharacterController ]
})
export class CharacterModule {}
