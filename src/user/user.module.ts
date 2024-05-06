import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, CaslAbilityFactory],
  exports: [UserService],
})
export class UserModule { }
