import Steps from './steps';
import Card from '../card';
import Button from '../button';
import './style.css';
import React, { useState } from 'react';

const Stepper = ({ data, header, children, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [validate, setValidate] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  // const [showError, setShowError] = useState();

  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextClick = () => {
    // Check 1. form
    if (currentStep === 0) {
      if (data.firstName && data.lastName && data.username && data.githubUrl) {
        setValidate({ ...validate, step1: false });
        setCurrentStep(currentStep + 1);
      } else {
        // setShowError(true);
        setValidate({ ...validate, step1: true });
      }
    }
    // Check 2. form
    else if (currentStep === 1) {
      if (data.email && data.mobile && data.password) {
        setValidate({ ...validate, step2: false });
        setCurrentStep(currentStep + 1);
      } else {
        // setShowError(true);
        setValidate({ ...validate, step2: true });
      }
    } else if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === children.length - 1) {
      onComplete();
    }
  };

  return (
    <Card>
      {header}
      <div className="steps-container">
        <Steps maxSteps={children.length} currentStep={currentStep} />
      </div>
      {children &&
        React.cloneElement(children[currentStep], {
          validating: Object.values(validate)[currentStep]
        })}

      <div className={currentStep > 0 ? 'stepper-buttons' : 'stepper-buttons-single'}>
        {currentStep > 0 && <Button text="Back" classes="offwhite" onClick={onBackClick} />}
        <Button
          text={currentStep === children.length - 1 ? 'Create profile' : 'Next'}
          classes="blue"
          onClick={onNextClick}
        />
      </div>
    </Card>
  );
};

export default Stepper;
