import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { CharacterEntity } from '../../database/entities/charater.entity';
import { DuplicatedInterceptor } from '../../shared/interceptors/duplicated.interceptor';
import { NotFoundInterceptor } from '../../shared/interceptors/not-found.interceptor';
import { CharacterService } from '../services/character.service';
import { of } from 'rxjs';

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
  async getCharacterById(
    @Param('id') id: number
  ) {
    return await this.characterService.findCharacterById(id);
  }

  @Post()
  @UseInterceptors(DuplicatedInterceptor)
  async createCharacter(
    @Body() character: DeepPartial<CharacterEntity>
  ) {
    return await this.characterService.createCharacter(character);
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async updateCharacter(
    @Param('id') id: number,
    @Body() character: DeepPartial<CharacterEntity>
  ) {
    return await this.characterService.updateCharacter(id, character);
  }

  @Delete(':id')
  @UseInterceptors(NotFoundInterceptor)
  async deleteCharacter(
    @Param('id') id: number
  ) {
    return await this.characterService.deleteCharacter(id);
  }

  @Get(':id/comics')
  @UseInterceptors(NotFoundInterceptor)
  async getComicsFromCharacter(
    @Param('id') id: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    return await this.characterService.findAllComicsFromCharacter(id, offset, limit);
  }

  @Get(':id/comics/:comicId')
  async getComicFromCharacter(
    @Param('id') id: number,
    @Param('comicId') comicId: number
  ) {
    return await this.characterService.findComicFromCharacterById(id, comicId);
  }
}
