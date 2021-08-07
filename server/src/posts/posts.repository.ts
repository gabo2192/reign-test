import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import fetch from 'node-fetch';

import { Post } from './schema/post.schema';

interface PostResponse {
  created_at: string;
  title?: string | null;
  story_title?: string | null;
  url?: string | null;
  author: string;
  story_url: string;
  objectID: string;
}

export class PostsRepository {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}
  private readonly logger = new Logger(PostsRepository.name);

  async addPosts(): Promise<Post[]> {
    try {
      const data: { hits: PostResponse[] } = await fetch(
        'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
      ).then((res) => res.json());
      const posts = data.hits;

      const formattedPosts: Post[] = posts
        .filter((posts) => !!posts.title || !!posts.story_title)
        .map((post) => {
          const postTitle = post.story_title || post.title;
          const postURL = post.story_url || post.url;
          return {
            postId: post.objectID,
            author: post.author,
            title: postTitle as string,
            createdAt: post.created_at,
            url: postURL as string,
          };
        });

      const localPosts = await this.postModel.find().exec();
      const localPostsIds: string[] = localPosts.map((post) => post.postId);

      const filteredPosts = formattedPosts.filter(
        (post) => !localPostsIds.includes(post.postId),
      );
      if (filteredPosts.length > 0) {
        return await this.postModel.create(filteredPosts);
      }
      return filteredPosts;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find().exec();
      if (posts.length === 0) {
        const newPosts = await this.addPosts();
        return newPosts;
      }
      return posts;
    } catch (err) {
      this.logger.error(err);
    }
  }
  async deletePost(id: string): Promise<boolean> {
    try {
      const post = await this.postModel.deleteOne({ _id: id });
      return post.deletedCount === 1;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }
}
