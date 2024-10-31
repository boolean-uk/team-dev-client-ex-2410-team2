import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';
import Post from '../post';
import { getPosts, get } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  const userID = jwtDecode(token).userId;

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  useEffect(() => {
    get(`users/${userID}`).then((res) => setUser(res.data.user));
  }, [userID]);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            author={post.author}
            postId={post.id}
            name={`${post.author.firstName} ${post.author.lastName}`}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
            /* post.author.id need to be changed to post.userId when post API is updated.  */
            isLoggedIn={post.author.id === userID}
            userRole={user?.role}
          />
        );
      })}
    </>
  );
};

export default Posts;
