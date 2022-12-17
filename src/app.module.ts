import { Module } from '@nestjs/common';
import { UserModule } from './apis/user/user.module';
import { HistoryModule } from './apis/history/history.module';
import { PreferenceModule } from './apis/preference/preference.module';
import { ContentsModule } from './apis/contents/contents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 3306),
        username: config.get('DB_USERNAME', 'test'),
        password: config.get('DB_PASSWORD', 'test'),
        database: config.get('DB_SCHEMA', 'netflix_clone'),
        entities: [join(__dirname, '/**/entities/*.entity.js')],
        synchronize: false,
        logging: true,
        keepConnectionAlive: true,
      }),
    }),

    UserModule,
    HistoryModule,
    PreferenceModule,
    ContentsModule,
  ],
})
export class AppModule {}
