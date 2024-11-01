import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  const response = await post('users', { email, password }, false);
  if (response.status !== 'fail') {
    return await login(email, password);
  }
  return response;
}

async function createProfile(
  userId,
  firstName,
  lastName,
  username,
  githubUrl,
  bio,
  email,
  mobile,
  password,
  profileImage,
  cohortId,
  startDate,
  endDate,
  role,
  specialism
) {
  return await patch(`users/${userId}`, {
    firstName,
    lastName,
    username,
    githubUrl,
    bio,
    email,
    mobile,
    password,
    profileImage,
    cohortId,
    startDate,
    endDate,
    role,
    specialism
  });
}

async function getPosts() {
  const res = await get('posts');
  return res.data.posts;
}

async function getUsers() {
  const res = await get('users');
  return res.data.users;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function deletePost(endpoint, auth = true) {
  return await request('DELETE', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PATCH') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

async function createComment(content, postId, userId) {
  const response = await post('comments', { content, postId, userId }, true);
  return response;
}

export {
  login,
  getPosts,
  register,
  createProfile,
  getUsers,
  get,
  post,
  patch,
  deletePost,
  createComment
};
