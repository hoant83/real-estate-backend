import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthHelper } from 'src/auth/authHelper';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { UserEntity } from 'src/entity/user.entity';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EstateEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserEntity,
    Object,
    EstateEntity,
    AuthHelper,
    JwtService,
    ConfigService,
    JwtStrategy,
  ],
})
export class UserModule {}
