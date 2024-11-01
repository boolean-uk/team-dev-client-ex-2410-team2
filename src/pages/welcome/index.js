import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import './style.css';
import StepThree from './stepThree';
import StepFour from './stepFour';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationPopup from '../../components/notificationPopup';

const Welcome = () => {
  const { onCreateProfile } = useAuth();
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const [showSuccess, setShowSucess] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    githubUrl: '',
    email: data.email,
    mobile: '',
    password: data.password,
    bio: '',
    username: '',
    photo: '',
    cohortId: data.cohort_id,
    endDate: data.endDate,
    startDate: data.startDate,
    role: data.role,
    specialism: data.specialism
  });

  const onPhotoChange = (photoData) => {
    setProfile({
      ...profile,
      profileImage: photoData
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  const onComplete = async () => {
    const res = await onCreateProfile(
      profile.firstName,
      profile.lastName,
      profile.username,
      profile.githubUrl,
      profile.bio,
      profile.email,
      profile.mobile,
      profile.password,
      profile.profileImage,
      profile.cohortId,
      profile.startDate,
      profile.endDate,
      profile.role,
      profile.specialism
    );
    if (res === 'success') {
      setShowSucess(true);
      const timer = setTimeout(() => {
        setShowSucess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    console.log(profile);
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper data={profile} header={<WelcomeHeader />} onComplete={onComplete}>
        <StepOne data={profile} setData={onChange} setPhoto={onPhotoChange} />
        <StepTwo data={profile} setData={onChange} />
        <StepThree data={profile} setData={onChange} />
        <StepFour data={profile} setData={onChange} />
      </Stepper>

      {showSuccess && (
        <NotificationPopup
          message="Profile created"
          actionText={'Edit'}
          onAction={() => navigate(`/profile/${data.id}`)}
        />
      )}
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
