import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();
  const userID = jwtDecode(token).userId;

  console.log(userID);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            name={`${post.author.firstName} ${post.author.lastName}`}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
            /* post.author.id need to be changed to post.userId when post API is updated. */
            isLoggedIn={post.author.id === userID}
            isTeacher={post.author.role === 'TEACHER'}
          />
        );
      })}
    </>
  );
};

export default Posts;
