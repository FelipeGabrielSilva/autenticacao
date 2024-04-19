import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async create(userId: number, createPostDto: CreatePostDto) {
    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        author: { connect: { id: userId } }
      }
    })

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

  async update(id: number, updatePostDto: UpdatePostDto) {

    const updatedPost = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: updatePostDto,
    })

    return updatePostDto;
  }

  async remove(id: number) {
    return await this.prisma.post.delete({
      where: {
        id: id,
      }
    });
  }
}
