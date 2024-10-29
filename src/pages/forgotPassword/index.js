import { useState } from 'react';
import TextInput from '../../components/form/textInput';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value);

    // TODO: Add validation for email, e.g. check if email exists in database.
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Sending password reset email to: ', email);

    // TODO: Add logic to send password reset email.
    setEmailError('');
  };

  return (
    <div className="bg-blue credentialpage">
      <form className="forgot-password-form" onSubmit={onSubmit}>
        <h1 className="forgot-password-title">Forgot password</h1>
        <TextInput value={email} onChange={onChange} name="email" label={'Email *'} />
        {emailError && <p className="error-message">{emailError}</p>}
        <button type="submit" className="green width-full forgot-password-submit-btn">
          Send reset email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
