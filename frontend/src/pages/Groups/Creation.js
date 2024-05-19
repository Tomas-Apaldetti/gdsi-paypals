import { LabeledInput } from 'ui-components/input/LabeledInput';
import { Form, Formik } from 'formik';
import Button from 'ui-components/button/Button';
import * as Yup from 'yup';
import { groupCreate } from 'services/groups';
import { TagIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { user } from 'utils/auth';

function GroupCreation({ onSuccesfullSubmit, onCancel }) {
  const initialValues = {
    name: '',
    description: '',
    category: '',
    members: [user().sub]
  };

  async function handleSubmit(values, { setStatus, setSubmitting }) {
    try {
      await groupCreate(values);
      onSuccesfullSubmit();
    } catch (e) {
      setStatus(e.message);
    } finally {
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
        category: Yup.string().max(128).required(),
      })}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
        return (
          <Form className='h-full  w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4'>
              <LabeledInput
                icon={<UserGroupIcon />}
                id='name'
                label='Name'
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />
              <LabeledInput
                icon={<TagIcon />}
                id='category'
                label='Category'
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />

              <LabeledInput
                id='description'
                label='Description'
                textarea
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />

              <div className='flex pt-10'>
                <div className='w-full'></div>

                <div className='w-full px-4'>
                  <Button secondary type='cancel' onClick={onCancel} disabled={isSubmitting}>
                    <span className='text-md font-semibold tracking-wider'>Cancel</span>
                  </Button>
                </div>

                <div className='w-full pl-4'>
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
