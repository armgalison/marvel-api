import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CharacterEntity } from '../../database/entities/charater.entity';
import { ComicEntity } from '../../database/entities/comic.entity';
import { BaseResponseData } from '../../shared/models/base-response-data.model';
import { BaseSingleResponseData } from '../../shared/models/base-single-response-data.model';

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
    const findOptions: FindManyOptions = { skip: offset, take: limit, relations: [ 'comics' ] };
    const total = await this.characterRepository.count();
    const characters = await this.characterRepository.find(findOptions);
    const count = characters.length;
    const results = this.mapCharactersToSmallResource(characters);

    return new BaseResponseData({ code, offset, limit, total, count, results });
  }

  async findCharacterById(id: number) {
    return await this.characterRepository.findOneOrFail({ id });
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

  async updateCharacter(id: number, character: DeepPartial<CharacterEntity>) {
    await this.characterRepository.findOneOrFail({ id });
    return await this.characterRepository.update({ id }, character);
  }

  async deleteCharacter(id: number) {
    await this.characterRepository.findOneOrFail({ id });
    return await this.characterRepository.delete({ id });
  }

  private mapCharactersToSmallResource(characters: any[]) {
    const baseUrl = this.configService.get('BASE_URL');
    const mapComic = (char, comic) => ({
      id: comic.id,
      resourceURI: `${baseUrl}/characters/${char.id}/comics/${comic.id}`
    });

    return characters.map(char => {
      char.comics = char.comics.map(comic => mapComic(char, comic));
      return char;
    });
  }
}
