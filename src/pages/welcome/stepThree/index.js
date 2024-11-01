import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import { useLocation } from 'react-router-dom';

const StepThree = ({ data, setData, setNotification }) => {
  const location = useLocation();
  const focus = location.pathname === '/welcome';
  return (
    <>
      <div className="welcome-formheader">
        <h3>Training info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <div onClick={setNotification}>
            <TextInput
              focused={focus}
              onChange={setData}
              value={data.role}
              name="role"
              label={'Role*'}
              type={'readOnly'}
            />
          </div>
          <div onClick={setNotification}>
            <TextInput
              onChange={setData}
              value={data.specialism}
              name="specialism"
              label={'Specialism*'}
              type={'readOnly'}
            />
          </div>
          <div onClick={setNotification}>
            <TextInput
              onChange={setData}
              value={`Cohort ${data.cohortId}`}
              name="cohort"
              label={'Cohort*'}
              type={'readOnly'}
            />
          </div>
          <div onClick={setNotification}>
            <TextInput
              onChange={setData}
              value={data.startDate}
              name="startDate"
              label={'Start Date*'}
              type={'readOnly'}
            />
          </div>
          <div onClick={setNotification}>
            <TextInput
              onChange={setData}
              value={data.endDate}
              name="endDate"
              label={'End Date*'}
              type={'readOnly'}
            />
          </div>
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
