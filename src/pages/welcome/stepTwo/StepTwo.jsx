import Form from '../../../components/form';

const StepTwo = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <textarea name="bio" value={data.bio} onChange={setData}></textarea>
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
