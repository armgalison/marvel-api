import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { CharacterEntity } from '../../database/entities/charater.entity';
import { DuplicatedInterceptor } from '../../shared/interceptors/duplicated.interceptor';
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

  @Get(':id/events')
  @UseInterceptors(NotFoundInterceptor)
  async getEventsFromCharacter(
    @Param('id') id: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    return await this.characterService.findAllEventsFromCharacter(id, offset, limit);
  }

  @Get(':id/events/:eventId')
  async getEventFromCharacter(
    @Param('id') id: number,
    @Param('eventId') eventId: number
  ) {
    return await this.characterService.findEventFromCharacterById(id, eventId);
  }

  @Get(':id/series')
  @UseInterceptors(NotFoundInterceptor)
  async getSeriesFromCharacter(
    @Param('id') id: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    return await this.characterService.findAllSeriesFromCharacter(id, offset, limit);
  }

  @Get(':id/series/:serieId')
  async getSerieFromCharacter(
    @Param('id') id: number,
    @Param('serieId') serieId: number
  ) {
    return await this.characterService.findSerieFromCharacterById(id, serieId);
  }

  @Get(':id/stories')
  @UseInterceptors(NotFoundInterceptor)
  async getStoriesFromCharacter(
    @Param('id') id: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ) {
    return await this.characterService.findAllStoriesFromCharacter(id, offset, limit);
  }

  @Get(':id/stories/:storyId')
  async getStoryFromCharacter(
    @Param('id') id: number,
    @Param('storyId') storyId: number
  ) {
    return await this.characterService.findStoryFromCharacterById(id, storyId);
  }
}
