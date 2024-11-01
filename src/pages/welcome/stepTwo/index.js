import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import { useLocation } from 'react-router-dom';

const StepTwo = ({ data, setData, validating, setNotification }) => {
  const location = useLocation();
  const focus = location.pathname === '/welcome';
  return (
    <>
      <div className="welcome-formheader">
        <h3>Contact info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <div onClick={setNotification}>
            <TextInput
              onChange={setData}
              type="readOnly"
              placeholder="Email"
              value={data.email}
              name="email"
              label={'Email*'}
            />
          </div>
          {validating
            ? !data.email && <p className="welcome-form-error">Please enter an email</p>
            : null}
          <TextInput
            focused={focus}
            onChange={setData}
            type="text"
            placeholder="Mobile"
            value={data.mobile}
            name="mobile"
            label={'Mobile*'}
          />
          {validating
            ? !data.mobile && <p className="welcome-form-error">Please enter a mobile number</p>
            : null}
          <div onClick={setNotification}>
            <TextInput
              onChange={setData}
              type="passwordReadOnly"
              placeholder="Password"
              value={data.password}
              name="password"
              label={'Password*'}
            />
          </div>
          {validating
            ? !data.password && <p className="welcome-form-error">Please enter a password</p>
            : null}
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
