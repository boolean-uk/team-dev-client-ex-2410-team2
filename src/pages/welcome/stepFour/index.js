import Form from '../../../components/form';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const StepFour = ({ data, setData }) => {
  const [characterCount, setCharacterCount] = useState(0);
  const location = useLocation();
  const focus = location.pathname === '/welcome';
  data.bio = data.bio || '';

  useEffect(() => {
    setCharacterCount(data.bio.length);
  }, [data.bio]);

  const handleChange = (event) => {
    const newBio = event.target.value;

    if (newBio.length <= 300) {
      setCharacterCount(newBio.length);

      setData({
        target: {
          name: 'bio',
          value: newBio
        }
      });
    }
  };

  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs-bio">
          <textarea
            autoFocus={focus}
            name="bio"
            value={data.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself, your professional and educational highlights to date..."
          ></textarea>
          <p className="text-blue1">{characterCount + '/300'}</p>
        </div>
      </Form>
    </>
  );
};

export default StepFour;
