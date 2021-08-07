import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Post } from './schema/post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly appService: PostsService) {}

  @Get()
  async getPosts(): Promise<Post[]> {
    return await this.appService.getPosts();
  }
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<boolean> {
    return await this.appService.deletePost(id);
  }
}
