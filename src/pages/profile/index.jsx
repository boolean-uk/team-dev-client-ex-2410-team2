import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import StepOne from '../welcome/stepOne';
import StepTwo from '../welcome/stepTwo';
import StepThree from '../welcome/stepThree';
import StepFour from '../welcome/stepFour';
import './profile.css'; // Import the CSS file
import Card from '../../components/card';
// import ProfileCircle from '../../components/profileCircle';
import { get } from '../../service/apiClient';
import NotificationPopup from '../../components/notificationPopup';
import useModal from '../../hooks/useModal';
import SaveProfileModal from '../../components/saveProfileModal';
import Button from '../../components/button';
import ProfileCircle from '../../components/profileCircle';

const Profile = () => {
  const { onCreateProfile } = useAuth();
  const { id } = useParams();
  let user = {};
  const setUser = () => {
    get(`users/${id}`).then((response) => {
      user = response.data.user;
      setProfile({ ...profile, ...user });
    });
  };

  const [profile, setProfile] = useState({
    firstName: 'A',
    lastName: 'A',
    githubUrl: '',
    email: '',
    mobile: '',
    password: '',
    bio: '',
    username: '',
    profileImage: '',
    cohortId: '',
    startDate: '',
    endDate: '',
    role: '',
    specialism: ''
  });

  useEffect(() => {
    setUser();
  }, []);

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

  const onComplete = () => {
    onCreateProfile(
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
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(<NotificationPopup />);
  const [notificationVariant, setNotificationVariant] = useState('none');
  const [notificationActionText, setNotificationActionText] = useState('close');

  const { openModal, setModal, closeModal } = useModal();

  const handleDontSave = () => {
    setNotificationMessage('Changes discarded');
    setNotificationVariant('success');
    setShowNotification(true);
    setNotificationActionText('Undo');
    closeModal();
  };

  const handleSaveModal = () => {
    onComplete();
    setNotificationMessage('Profile saved');
    setNotificationVariant('success');
    setShowNotification(true);
    setNotificationActionText('Edit');
    closeModal();
  };

  const firstLetterToUpperCase = (string) => {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  };

  useEffect(() => {
    setModal(
      'Save Changes',
      <SaveProfileModal onDontSave={handleDontSave} onSave={handleSaveModal} />
    );
  }, [profile]);

  const onClick = (event) => {
    console.log('Notification sent');
    setNotificationMessage(firstLetterToUpperCase(event.target.name) + ' is locked');
    setNotificationVariant('none');
    setNotificationActionText('close');
    setShowNotification(true);
  };

  return (
    <>
      <main className="profile">
        <h1 className="profile-header">Profile</h1>
        <Card className="profile-card">
          <div className="profile-titleblock">
            <ProfileCircle initials={profile.firstName[0] + profile.lastName[0]} />
            <div className="profile-name">
              <p className="profile-name-tag">{`${profile.firstName} ${profile.lastName}`}</p>
              <p className="profile-specialism-tag">{profile.specialism}</p>
            </div>
          </div>
          <div className="grid-container">
            <div className="grid-item">
              <StepOne
                className="step"
                data={profile}
                setData={onChange}
                setPhoto={onPhotoChange}
              />
            </div>
            <div className="grid-item">
              <StepThree
                className="step"
                data={profile}
                setData={onChange}
                setNotification={onClick}
              />
            </div>
            <div className="grid-item">
              <StepTwo
                className="step"
                data={profile}
                setData={onChange}
                setNotification={onClick}
              />
            </div>
            <div className="grid-item">
              <StepFour className="step" data={profile} setData={onChange} />
              <div className="grid-buttons">
                <Button text={'Cancel'} classes="button offwhite" />
                <Button text={'Save'} classes="blue" onClick={openModal} />
              </div>
            </div>
          </div>
        </Card>
      </main>
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          onAction={() => setShowNotification(false)}
          variant={notificationVariant}
          actionText={notificationActionText}
        />
      )}
    </>
  );
};

export default Profile;
