import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import './style.css';
import StepThree from './stepThree';
import StepFour from './stepFour';

const Welcome = () => {
  const { onCreateProfile } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    githubUsername: '',
    email: '',
    mobile: '',
    password: '',
    bio: ''
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

  const onComplete = () => {
    onCreateProfile(
      profile.firstName,
      profile.lastName,
      profile.githubUsername,
      profile.bio,
      profile.email,
      profile.mobile,
      profile.password
    );
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete}>
        <StepOne data={profile} setData={onChange} setPhoto={onPhotoChange} />
        <StepTwo data={profile} setData={onChange} />
        <StepThree data={profile} setData={onChange} />
        <StepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;
