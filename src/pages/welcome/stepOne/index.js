import ProfileIcon from '../../../assets/icons/profileIcon';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import UploadPhotoModal from '../../../components/uploadPhotoModal';
import useModal from '../../../hooks/useModal';
import './style.css';

const StepOne = ({ data, setData, setPhoto, validating, setValidating }) => {
  const { openModal, setModal } = useModal();

  const setPhotoData = (photoData) => {
    setPhoto(photoData);
  };

  const showModal = () => {
    setModal('Upload a photo', <UploadPhotoModal setPhotoData={setPhotoData} />);
    openModal();
  };

  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-profileimg">
          <p className="text-blue1">Photo</p>
          <div className="welcome-form-profileimg-input">
            {data.profileImage ? (
              <>
                <img src={data.profileImage} className="welcome-form-profileimg-icon" />
              </>
            ) : (
              <ProfileIcon colour="#28C846" background="#64DC78" />
            )}
            <div className="welcome-form-profileimg-selections">
              <p onClick={showModal} className="text-blue1">
                {data.profileImage ? 'Change headshot' : 'Add headshot'}
              </p>
              <p onClick={() => setPhotoData('')} className="text-blue1">
                {data.profileImage && 'Remove headshot'}
              </p>
            </div>
          </div>
          <p className="welcome-form-profileimg-error">Please upload a valid image file</p>
        </div>
        <div className="welcome-form-inputs">
          <TextInput
            focused={true}
            onChange={setData}
            value={data.firstName}
            name="firstName"
            label={'First name*'}
          />
          {validating && !data.firstName && (
            <p className="welcome-form-error">Please enter a first name</p>
          )}
          <TextInput
            onChange={setData}
            value={data.lastName}
            name="lastName"
            label={'Last name*'}
          />
          {validating && !data.lastName && (
            <p className="welcome-form-error">Please enter a last name</p>
          )}
          <TextInput
            onChange={setData}
            value={data.username}
            name="username"
            label={'User name*'}
          />
          {validating && !data.username && (
            <p className="welcome-form-error">Please enter a user name</p>
          )}
          <TextInput
            onChange={setData}
            value={data.githubUrl}
            name="githubUrl"
            label={'Github Username*'}
          />
          {validating && !data.githubUrl && (
            <p className="welcome-form-error">Please enter a github username</p>
          )}
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepOne;
