import React, { useEffect, useState } from "react";
import PostItem from "./post-item";

interface Post {
  id: string;
  title: string;
  author: string;
  url?: string;
  createAt: string;
}

interface PostResponse {
  _id: string;
  postId: string;
  author: string;
  title: string;
  createdAt: string;
  url: string;
}

const baseURL = "http://localhost:4000";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log(import.meta.env);
    const fetchData = async () => {
      const postsAPI: PostResponse[] = await fetch(`${baseURL}/posts`).then(
        (res) => res.json()
      );
      setPosts(
        postsAPI
          .map((post) => {
            return {
              id: post._id,
              title: post.title,
              url: post.url,
              author: post.author,
              createAt: post.createdAt,
            };
          })
          .sort((a, b) => {
            const dateA = new Date(a.createAt);
            const dateB = new Date(b.createAt);
            return dateB.getTime() - dateA.getTime();
          })
      );
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`${baseURL}/posts/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    console.log(response);
    setPosts((posts) => posts.filter((post) => post.id !== id));
  };

  return (
    <ul className="post__list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          author={post.author}
          date={post.createAt}
          title={post.title}
          url={post.url}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default PostList;
