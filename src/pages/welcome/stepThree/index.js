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
            value={'Student'}
            name="role"
            label={'Role*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={'Software Developer'}
            name="specialism"
            label={'Specialism*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={'Cohort 4'}
            name="cohort"
            label={'Cohort*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={'January 2023'}
            name="startDate"
            label={'Start Date*'}
            type={'readOnly'}
          />
          <TextInput
            onChange={setData}
            value={'June 2023'}
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
