import { Connection, createConnection } from 'typeorm';

import { CharacterEntity } from './entities/charater.entity';
import { ComicEntity } from './entities/comic.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'sqlite',
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
];
