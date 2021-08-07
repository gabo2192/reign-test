import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Post } from '../schema/post.schema';
import { PostsRepository } from '../posts.repository';
import { postSamples } from '../__mocks__/post.sample';

describe('PostsService', () => {
  let provider: PostsRepository;
  const mockPost = {
    find: jest.fn(() => {
      return {
        exec: jest.fn(() => {
          return postSamples();
        }),
      };
    }),
    deleteOne: jest.fn((id: string) => {
      if (id) {
        return {
          deletedCount: 1,
        };
      }
    }),
    create: jest.fn((filteredPosts: Post[]) => {
      if (filteredPosts) return postSamples();
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsRepository,
        {
          provide: getModelToken(Post.name),
          useValue: mockPost,
        },
      ],
    }).compile();

    provider = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  it('should call get posts', async () => {
    const posts = await provider.getPosts();
    expect(posts).toEqual(postSamples());
  });
  it('should call delete post', async () => {
    const postID = '610b1136802cfc254df4e6a7';
    const isDeleted = await provider.deletePost(postID);
    expect(isDeleted).toBeTruthy();
  });
  it('should call add posts', async () => {
    const posts = await provider.addPosts();
    expect(posts).toEqual(postSamples());
  });
});
