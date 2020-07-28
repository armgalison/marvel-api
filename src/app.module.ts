import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CharacterModule } from './character/character.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CharacterModule,
    SharedModule
  ],
  controllers: []
})
export class AppModule {}
