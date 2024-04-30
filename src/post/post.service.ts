import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
  ) { }


  async create(userId: number, createPostDto: CreatePostDto) {
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
      where: { id: id },
    });
  }

  async update(userId: number, id: number, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });

    return updatedPost;
  }

  async remove(userId: number, id: number) {
    await this.prisma.post.delete({
      where: { id },
    });

    return `Postagem ${id} removida`;
  }
}
