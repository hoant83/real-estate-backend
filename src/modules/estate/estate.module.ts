import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { EstateController } from './estate.controller';
import { EstateService } from './estate.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstateEntity])],
  controllers: [EstateController],
  providers: [EstateService],
})
export class EstateModule {}
