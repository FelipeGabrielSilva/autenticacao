import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, UserService, CaslAbilityFactory],
})
export class PostModule { }
