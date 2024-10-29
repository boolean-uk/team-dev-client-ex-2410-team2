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
    console.log('Upload photo modal opened');
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
            {data.photo ? (
              <>
                <img src={data.photo} className="welcome-form-profileimg-icon" />
              </>
            ) : (
              <ProfileIcon colour="#28C846" background="#64DC78" />
            )}
            <p onClick={showModal} className="text-blue1">
              {data.photo ? 'Change headshot' : 'Add headshot'}
            </p>
          </div>
          <p className="welcome-form-profileimg-error">Please upload a valid image file</p>
        </div>
        <div className="welcome-form-inputs">
          <TextInput
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
            value={data.userName}
            name="userName"
            label={'User name*'}
          />
          {validating && !data.userName && (
            <p className="welcome-form-error">Please enter a user name</p>
          )}
          <TextInput
            onChange={setData}
            value={data.githubUsername}
            name="githubUsername"
            label={'Github Username*'}
          />
          {validating && !data.githubUsername && (
            <p className="welcome-form-error">Please enter a github username</p>
          )}
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepOne;
