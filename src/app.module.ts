import { Module } from '@nestjs/common';
import { HistoryModule } from './apis/history/history.module';
import { PreferenceModule } from './apis/preference/preference.module';
import { ContentModule } from './apis/content/content.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './apis/auth/auth.module';
import { UniversalStrategy } from './apis/auth/strategy/universal.strategy';
import { UniversalGuard } from './apis/auth/guard/universal.guard';
import { UploadModule } from './apis/upload/upload.module';
import { PlayModule } from './apis/play/play.module';

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
    AuthModule,
    HistoryModule,
    PreferenceModule,
    ContentModule,
    PlayModule,
    UploadModule,
  ],
  providers: [UniversalStrategy, UniversalGuard],
})
export class AppModule {}
