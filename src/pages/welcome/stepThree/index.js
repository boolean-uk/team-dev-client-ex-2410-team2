import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepThree = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Training info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            focused={true}
            onChange={setData}
            value={data.role}
            name="role"
            label={'Role*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={data.specialism}
            name="specialism"
            label={'Specialism*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={`Cohort ${data.cohortId}`}
            name="cohort"
            label={'Cohort*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={data.startDate}
            name="startDate"
            label={'Start Date*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={data.endDate}
            name="endDate"
            label={'End Date*'}
            type={'readOnly'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
