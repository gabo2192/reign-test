import { Post } from '../schema/post.schema';

export const postSamples = (): Post[] => {
  return [
    {
      postId: '28066862',
      author: 'nodejs_rulez_1',
      title: 'Simple Systems Have Less Downtime (2020)',
      createdAt: '2021-08-04T21:51:44.000Z',
      url: 'https://www.gkogan.co/blog/simple-systems/',
    },
    {
      postId: '28065788',
      author: 'alkonaut',
      title: 'Going mouseless',
      createdAt: '2021-08-04T20:20:01.000Z',
      url: 'https://felipecortez.net/blog/mouseless.html',
    },
    {
      postId: '28065776',
      author: 'CudaChris',
      title: 'Ask HN: Who is hiring? (August 2021)',
      createdAt: '2021-08-04T20:19:19.000Z',
      url: null,
    },
    {
      postId: '28064218',
      author: 'k0t0n0',
      title: 'Ask HN: Please recommend a serious book on Microservices',
      createdAt: '2021-08-04T18:06:11.000Z',
      url: null,
    },
    {
      postId: '28064179',
      author: 'stingraycharles',
      title: 'Use Phoenix Channels',
      createdAt: '2021-08-04T18:02:41.000Z',
      url: 'https://info.codecast.io/blog/how-to-use-phoenix-channels',
    },
    {
      postId: '28063765',
      author: 'nodejs_rulez_1',
      title: 'Simple Systems Have Less Downtime (2020)',
      createdAt: '2021-08-04T17:27:17.000Z',
      url: 'https://www.gkogan.co/blog/simple-systems/',
    },
  ];
};

export const postSample = (): Post => {
  return {
    postId: '1234123',
    author: 'nodejs_rulez_1',
    title: 'Simple Systems Have Less Downtime (2020)',
    createdAt: '2021-08-04T21:51:44.000Z',
    url: 'https://www.gkogan.co/blog/simple-systems/',
  };
};
