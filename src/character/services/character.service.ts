import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CharacterEntity } from '../../database/entities/charater.entity';
import { ComicEntity } from '../../database/entities/comic.entity';
import { BaseResponseData } from '../../shared/models/base-response-data.model';
import { BaseSingleResponseData } from '../../shared/models/base-single-response-data.model';
import { EventEntity } from '../../database/entities/event.entity';
import { SerieEntity } from '../../database/entities/serie.entity';
import { StoryEntity } from '../../database/entities/story.entity';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('CHARACTER_REPOSITORY')
    private characterRepository: Repository<CharacterEntity>,
    private readonly configService: ConfigService
  ) {}

  async createCharacter(character: DeepPartial<CharacterEntity>) {
    const characterInstance = await this.characterRepository.create(character);
    return await characterInstance.save();
  }

  async findAllCharacters(offset: number = 0, limit: number = 100) {
    const code = 200;
    const findOptions: FindManyOptions = {
      skip: offset,
      take: limit,
      relations: [ 'comics', 'series', 'events', 'stories' ]
    };
    const total = await this.characterRepository.count();
    const characters = await this.characterRepository.find(findOptions);
    const count = characters.length;
    const results = this.mapCharactersToSmallResource(characters);

    return new BaseResponseData({ code, offset, limit, total, count, results });
  }

  async findCharacterById(id: number) {
    const findOptions = { relations: [ 'comics', 'series', 'events', 'stories' ]};
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const smallResourceChar = this.mapCharacterToSmallResource(character);

    return new BaseSingleResponseData(200, 'Ok', smallResourceChar);
  }

  async findAllComicsFromCharacter(id: number, offset: number = 0, limit: number = 200) {
    const code = 200;
    const findOptions: FindOneOptions = { relations: [ 'comics' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const comics = character.comics;
    const total = comics.length;
    const results = comics.slice(offset, offset + limit);
    const count = results.length;

    return new BaseResponseData({ code, offset, limit, total, count, results });
  }

  async findComicFromCharacterById(id: number, comicId: number) {
    const findOptions: FindOneOptions<CharacterEntity> = { relations: [ 'comics' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const comic = character.comics.find(comic => comic.id == comicId);

    if (!comic) {
      throw new NotFoundException(`Comic {${comicId}} not found into current character`);
    }

    return new BaseSingleResponseData<ComicEntity>(200, 'Ok', comic);
  }

  async findAllEventsFromCharacter(id: number, offset: number = 0, limit: number = 200) {
    const code = 200;
    const findOptions: FindOneOptions = { relations: [ 'events' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const events = character.events;
    const total = events.length;
    const results = events.slice(offset, offset + limit);
    const count = results.length;

    return new BaseResponseData({ code, offset, limit, total, count, results });
  }

  async findEventFromCharacterById(id: number, eventId: number) {
    const findOptions: FindOneOptions<CharacterEntity> = { relations: [ 'events' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const event = character.events.find(event => event.id == eventId);

    if (!event) {
      throw new NotFoundException(`Event {${eventId}} not found into current character`);
    }

    return new BaseSingleResponseData<EventEntity>(200, 'Ok', event);
  }

  async findAllSeriesFromCharacter(id: number, offset: number = 0, limit: number = 200) {
    const code = 200;
    const findOptions: FindOneOptions = { relations: [ 'series' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const series = character.series;
    const total = series.length;
    const results = series.slice(offset, offset + limit);
    const count = results.length;

    return new BaseResponseData({ code, offset, limit, total, count, results });
  }

  async findSerieFromCharacterById(id: number, serieId: number) {
    const findOptions: FindOneOptions<CharacterEntity> = { relations: [ 'series' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const serie = character.series.find(serie => serie.id == serieId);

    if (!serie) {
      throw new NotFoundException(`Serie {${serieId}} not found into current character`);
    }

    return new BaseSingleResponseData<SerieEntity>(200, 'Ok', serie);
  }

  async findAllStoriesFromCharacter(id: number, offset: number = 0, limit: number = 200) {
    const code = 200;
    const findOptions: FindOneOptions = { relations: [ 'stories' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const stories = character.stories;
    const total = stories.length;
    const results = stories.slice(offset, offset + limit);
    const count = results.length;

    return new BaseResponseData({ code, offset, limit, total, count, results });
  }

  async findStoryFromCharacterById(id: number, storyId: number) {
    const findOptions: FindOneOptions<CharacterEntity> = { relations: [ 'stories' ] };
    const character = await this.characterRepository.findOneOrFail({ id }, findOptions);
    const story = character.stories.find(story => story.id == storyId);

    if (!story) {
      throw new NotFoundException(`Story {${storyId}} not found into current character`);
    }

    return new BaseSingleResponseData<StoryEntity>(200, 'Ok', story);
  }

  async updateCharacter(id: number, character: DeepPartial<CharacterEntity>) {
    await this.characterRepository.findOneOrFail({ id });
    return await this.characterRepository.update({ id }, character);
  }

  async deleteCharacter(id: number) {
    await this.characterRepository.findOneOrFail({ id });
    return await this.characterRepository.delete({ id });
  }

  private mapCharacterToSmallResource(character: any) {
    const baseUrl = this.configService.get('BASE_URL');
    const mapComic = (char, comic) => ({
      id: comic.id,
      resourceURI: `${baseUrl}/characters/${char.id}/comics/${comic.id}`
    });

    const mapSerie = (char, serie) => ({
      id: serie.id,
      resourceURI: `${baseUrl}/characters/${char.id}/series/${serie.id}`
    });

    const mapEvent = (char, event) => ({
      id: event.id,
      resourceURI: `${baseUrl}/characters/${char.id}/events/${event.id}`
    });

    const mapStory = (char, story) => ({
      id: story.id,
      resourceURI: `${baseUrl}/characters/${char.id}/stories/${story.id}`
    });

    character.comics = character.comics.map(comic => mapComic(character, comic));
    character.series = character.series.map(serie => mapSerie(character, serie));
    character.events = character.events.map(event => mapEvent(character, event));
    character.stories = character.stories.map(story => mapStory(character, story));

    return character;
  }

  private mapCharactersToSmallResource(characters: any[]) {
    return characters.map(this.mapCharacterToSmallResource.bind(this));
  }
}
