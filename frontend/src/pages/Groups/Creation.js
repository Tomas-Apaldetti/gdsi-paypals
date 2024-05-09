import { LabeledInput } from 'ui-components/input/LabeledInput';
import { Form, Formik } from 'formik';
import Button from 'ui-components/button/Button';
import * as Yup from 'yup';
import { groupCreate } from 'services/groups';

function GroupCreation({onSuccesfullSubmit, onCancel}) {
  const initialValues = {
    name: '',
    description: '',
    category: '',
  };

  async function handleSubmit(values, { setStatus, setSubmitting }){
    try{
      await groupCreate(values);
      onSuccesfullSubmit();
    }catch(e){
      setStatus(e.message);
    }finally{
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(30).required('Name for the group is required'),
        description: Yup.string().max(255).nullable(),
        category: Yup.string().max(255).nullable(),
      })}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
        return (
          <Form className='h-full w-full flex flex-col justify-between px-4 pb-4'>
            <div className='w-3/5'>
              <LabeledInput
                id='name'
                label='Name'
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />
              <LabeledInput
                id='description'
                label='Description'
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />
              <LabeledInput
                id='category'
                label='Category'
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />
            </div>

            <div className='flex'>
              <div className='w-full'></div>

              <div className='w-full px-4'>
                <Button secondary type='cancel' onClick={onCancel} disabled={isSubmitting} >
                  <span className='text-md font-semibold tracking-wider'>Cancel</span>
                </Button>
              </div>

              <div className = 'w-full px-4'>
                <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
                  <span className='text-md font-semibold tracking-wider'>Create</span>
                </Button>
              </div>

            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default GroupCreation;
