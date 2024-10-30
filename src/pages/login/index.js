import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const { onLogin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorMessage = await onLogin(formData.email, formData.password, rememberMe);
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  const handleCheckboxChange = () => setRememberMe(!rememberMe);

  return (
    <div className="bg-blue login credentialpage">
      <CredentialsCard
        title="Login"
        socialLinksTitle="Or log in with"
        altButtonTitle="Need an account?"
        altButtonLink="/register"
        altButtonText="Sign up"
      >
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <TextInput value={formData.email} onChange={onChange} name="email" label={'Email *'} />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
            <div className="remember-forgot-container">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  value="remember-me"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="remember-me">Remember me?</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <p className="required-indicator">*Required</p>
            {error && <p className="error-message">{error}</p>}
            <Button text="Log in" type="submit" classes="green width-full" />
          </form>
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Login;
