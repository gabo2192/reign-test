import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from '../posts.service';
import { postSamples } from '../__mocks__/post.sample';
import { Post } from '../schema/post.schema';
import { PostsRepository } from '../posts.repository';

describe('PostsService', () => {
  let provider: PostsService;
  const mockPost = {};
  const mockPostRepository = {
    addPosts: jest.fn(() => {
      return postSamples();
    }),
    getPosts: jest.fn(() => {
      return postSamples();
    }),
    deletePost: jest.fn((id: string) => {
      return true;
    }),
    handleCron: jest.fn(() => {
      mockPostRepository.addPosts();
      return true;
    }),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsService,
        PostsRepository,
        {
          provide: getModelToken(Post.name),
          useValue: mockPost,
        },
      ],
    })
      .overrideProvider(PostsRepository)
      .useValue(mockPostRepository)
      .compile();

    provider = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  it('should run getPosts successfully', async () => {
    expect(await provider.getPosts()).toEqual(postSamples());
  });
  it('should run addPosts successfully', async () => {
    const posts = await provider.addPosts();
    expect(posts).toEqual(postSamples());
  });
  it('should run deletePost successfully', async () => {
    const postID = '12341234';
    const post = await provider.deletePost(postID);
    expect(post).toBeTruthy();
  });
  it('should run schedule addPost successfully', async () => {
    const scheduleEvent = await provider.handleCron();
    expect(scheduleEvent).toBeTruthy();
  });
});
