import { Connection, createConnection } from 'typeorm';

import { CharacterEntity } from './entities/charater.entity';
import { ComicEntity } from './entities/comic.entity';
import { EventEntity } from './entities/event.entity';
import { SerieEntity } from './entities/serie.entity';
import { StoryEntity } from './entities/story.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: process.env.DATABASE_TYPE as 'sqlite' | 'mariadb',
      database: process.env.DATABASE_FILE,
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      logging: false,
      dropSchema: false
    })
  },
  {
    provide: 'CHARACTER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CharacterEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'COMIC_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ComicEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'EVENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(EventEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'SERIE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SerieEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'STORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(StoryEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
