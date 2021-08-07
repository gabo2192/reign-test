import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Post } from './schema/post.schema';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  private readonly logger = new Logger(PostsService.name);

  @Cron('0 0 */1 * * *')
  async handleCron() {
    this.logger.debug('Adding new posts every hour');
    const createdPosts = await this.postsRepository.addPosts();
    let logString: string;
    switch (createdPosts.length) {
      case 0:
        logString = 'There were no new posts added';
        break;
      case 1:
        logString = `${createdPosts.length} post was added successfully`;
        break;
      default:
        logString = `${createdPosts.length} posts were added successfully`;
        break;
    }

    this.logger.debug(logString);
    return true;
  }

  async addPosts(): Promise<Post[]> {
    return await this.postsRepository.addPosts();
  }
  async getPosts(): Promise<Post[]> {
    return await this.postsRepository.getPosts();
  }
  async deletePost(id): Promise<boolean> {
    return await this.postsRepository.deletePost(id);
  }
}
