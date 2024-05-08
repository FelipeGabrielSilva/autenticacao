import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/authorization/action.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory
  ) { }

  async create(userId: number, createPostDto: CreatePostDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Create, 'Post')) {
      throw new Error('Você não tem permissão para criar um post');
    }

    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        author: { connect: { id: userId } }
      }
    });

    return newPost;
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: { id },
    });
  }

  async update(userId: number, id: number, updatePostDto: UpdatePostDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, 'Post')) {
      throw new Error('Você não tem permissão para atualizar o post');
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });

    return updatedPost;
  }

  async remove(userId: number, id: number) {
    const user = await this.userService.findOne(userId);

    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Delete, 'Post')) {
      throw new Error('Você não tem permissão para excluir o post');
    } else {
      
      await this.prisma.post.delete({
        where: { id },
      });

      return `post ${id} removida`;
    }
  }
}
