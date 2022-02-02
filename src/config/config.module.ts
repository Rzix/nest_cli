import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './entities/config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ConfigEntity])],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports:[ConfigService]
})
export class ConfigModule {}
