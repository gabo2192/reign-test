import { Test } from '@nestjs/testing';
import { PostsService } from '../posts.service';
import { PostsController } from '../posts.controller';
import { Post } from '../schema/post.schema';
import { postSamples } from '../__mocks__/post.sample';

describe('PostController', () => {
  let postsController: PostsController;
  let postsService: PostsService;
  const MockService = {
    getPosts: jest.fn(() => {
      return postSamples();
    }),
    deletePost: jest.fn((id: string) => {
      return true;
    }),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(MockService)
      .compile();

    postsController = moduleRef.get<PostsController>(PostsController);
    postsService = moduleRef.get<PostsService>(PostsService);
    jest.clearAllMocks();
  });
  describe('getPosts', () => {
    it('should return getPosts Function', async () => {
      const posts: Post[] = await postsController.getPosts();
      expect(postsService.getPosts).toHaveBeenCalled();
      expect(posts).toEqual(postSamples());
    });
  });
  describe('deletePost', () => {
    it('should call deletePost function', async () => {
      const postId = '28066862';
      const post: boolean = await postsController.deletePost(postId);
      expect(postsService.deletePost).toHaveBeenCalled();
      expect(post).toBeTruthy;
    });
  });
});
