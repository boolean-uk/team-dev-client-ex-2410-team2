import Button from '../../components/button';
import TickIcon from '../../assets/tickIcon';
import './verification.css';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate();

  const onContinueClick = () => {
    navigate('/welcome');
  };

  return (
    <div className="bg-blue verify credentialpage">
      <div className="bg-white verify-card">
        <TickIcon />
        <h1 className="h3">Welcome to Cohort Manager</h1>
        <div className="text-blue1">
          <p className="text-medium">
            We have sent you a verification email to check and confirm your email address.
          </p>
          <br />
          <p className="text-medium">
            Please follow the link in the email to log in to Cohort Manager.
          </p>
        </div>
        <div className="verify-card-buttons">
          <Button text="Resend email" classes="offwhite" />
          <Button text="Continue" onClick={onContinueClick} classes="green" />
        </div>
      </div>
    </div>
  );
};

export default Verification;
