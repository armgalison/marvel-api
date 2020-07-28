import { Controller, Get, Param, Post, Query, UseInterceptors, Body } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { CharacterEntity } from '../../database/entities/charater.entity';
import { NotFoundInterceptor } from '../../shared/interceptors/not-found.interceptor';
import { CharacterService } from '../services/character.service';

@Controller('characters')
export class CharacterController {

  constructor (
    private readonly characterService: CharacterService
  ) {}

  @Get()
  async getAllCharacters(
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    return await this.characterService.findAllCharacters(offset, limit);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getCharacterById(@Param('id') id: number) {
    return await this.characterService.findCharacterById(id);
  }

  @Post()
  async createCharacter(@Body() character: DeepPartial<CharacterEntity>) {
    console.log(character)
    return await this.characterService.createCharacter(character);
  }
}
