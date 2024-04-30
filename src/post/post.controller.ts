import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const user = req.user.id;
    const newPost = await this.postService.create(user, createPostDto);
    return newPost;
  }


  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const user = req.user.id;
    return this.postService.update(user, +id, updatePostDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.postService.remove(user, +id);
  }
}
