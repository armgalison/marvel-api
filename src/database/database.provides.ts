import { Connection, createConnection } from 'typeorm';

import { CharacterEntity } from './entities/charater.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mariadb',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT || 3306),
      username: process.env.DATA_USER || 'ironman',
      password: process.env.DATABASE_PASSWORD || 'howard-stark',
      database: process.env.DATABASE || 'marvel',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      logging: true,
      dropSchema: false
    })
  },
  {
    provide: 'CHARACTER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CharacterEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
