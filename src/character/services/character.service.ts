import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial, Repository, FindManyOptions } from 'typeorm';

import { CharacterEntity } from '../../database/entities/charater.entity';

@Injectable()
export class CharacterService {

  constructor(
    @Inject('CHARACTER_REPOSITORY')
    private characterRepository: Repository<CharacterEntity>
  ) {}

  async findAllCharacters(offset: number = 0, limit: number = 100) {
    const findOptions: FindManyOptions = { skip: offset, take: limit };
    const total = await this.characterRepository.count();
    const count = await this.characterRepository.count(findOptions);
    const characters = await this.characterRepository.find(findOptions);  

    return {
      code: 200,
      data: {
        offset: Number(offset),
        limit: Number(limit),
        total: Number(total),
        count: Number(count),
        results: characters
      }
    }
  }

  async findCharacterById(id: number) {
    return await this.characterRepository.findOneOrFail({ id });
  }

  async createCharacter(character: DeepPartial<CharacterEntity>) {
    const characterInstance = await this.characterRepository.create(character);
    return await characterInstance.save();
  }
}
