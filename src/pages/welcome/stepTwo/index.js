import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepTwo = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Contact info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            type="text"
            placeholder="Email"
            value={data.email}
            name="email"
            label={'Email*'}
          />
          <TextInput
            onChange={setData}
            type="text"
            placeholder="Mobile"
            value={data.mobile}
            name="mobile"
            label={'Mobile*'}
          />
          <TextInput
            onChange={setData}
            type="password"
            placeholder="Password"
            value={data.password}
            name="password"
            label={'Password*'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
