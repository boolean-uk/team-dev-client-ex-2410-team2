import { useParams } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import StepOne from '../welcome/stepOne';
import StepTwo from '../welcome/stepTwo';
import StepThree from '../welcome/stepThree';
import StepFour from '../welcome/stepFour';
import './profile.css'; // Import the CSS file
// import { get } from '../../service/apiClient';

const Profile = () => {
  // const { onCreateProfile } = useAuth();
  const { id } = useParams();
  console.log(id); // Debug
  /* const setUser = () => {
    get(`users/${id}`).then((response) => {
      setProfile(response.data.user);
    });
  }; */
  // setUser();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    githubUsername: '',
    email: '',
    mobile: '',
    password: 'PasswordFiller',
    bio: '',
    userName: '',
    photo: ''
  });

  const onPhotoChange = (photoData) => {
    setProfile({
      ...profile,
      photo: photoData
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  /* const onComplete = () => {
    onCreateProfile(
      profile.firstName,
      profile.lastName,
      profile.userName,
      profile.githubUsername,
      profile.bio,
      profile.email,
      profile.mobile,
      profile.password,
      profile.photo
    );
  }; */

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>
      <div className="grid-container">
        <div className="grid-item">
          <StepOne data={profile} setData={onChange} setPhoto={onPhotoChange} />
        </div>
        <div className="grid-item">
          <StepThree data={profile} setData={onChange} />
        </div>
        <div className="grid-item">
          <StepTwo data={profile} setData={onChange} />
        </div>
        <div className="grid-item">
          <StepFour data={profile} setData={onChange} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
