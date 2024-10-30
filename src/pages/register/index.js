import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import ErrorFeedback from '../../components/errorFeedback/ErrorFeedback';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Copilot suggested this regex for password validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    return regex.test(password);
  };

  // Stack overflow email validation regex
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Should also validate password
  const validateAndRegister = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (validateEmail(email) && validatePassword(password)) {
      onRegister(email, password).then(function () {
        setErrorMsg('Email already in use');
        setShowEmailError(true);
      });
    }
    if (!validateEmail(email)) {
      setErrorMsg('Email needs to be a valid email (asd@asd.com)');
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }
    if (!validatePassword(password)) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
  };

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form onSubmit={validateAndRegister}>
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="email"
              name="email"
              label={'Email *'}
              placeholder="Email*"
            />
            {showEmailError && <ErrorFeedback error={errorMsg} />}
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
              placeholder="Password*"
            />
            {showPasswordError && (
              <ErrorFeedback
                error={
                  'Password must contain at least eight characters, including at least one capital letter, one number and one special character'
                }
              />
            )}

            <Button text="Sign up" type="submit" classes="green width-full" />
          </form>
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
