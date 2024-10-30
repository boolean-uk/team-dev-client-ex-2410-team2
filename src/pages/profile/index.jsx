import React from 'react';
import { useParams } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';

const Profile = () => {
  // const { onCreateProfile } = useAuth();
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
};

export default Profile;
