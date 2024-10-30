import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepTwo = ({ data, setData, validating }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Contact info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            type="readOnly"
            placeholder="Email"
            value={data.email}
            name="email"
            label={'Email*'}
          />
          {validating
            ? !data.email && <p className="welcome-form-error">Please enter an email</p>
            : null}
          <TextInput
            focused={true}
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
          <TextInput
            onChange={setData}
            type="passwordReadOnly"
            placeholder="Password"
            value={data.password}
            name="password"
            label={'Password*'}
          />
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
