import { LabeledInput } from 'ui-components/input/LabeledInput';
import { Form, Formik } from 'formik';
import Button from 'ui-components/button/Button';
import * as Yup from 'yup';
import { groupCreate } from 'services/groups';
import { TagIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { useAPIData } from 'hooks/useAPIData';
import { getUsers } from 'services/users';
import { MultipleDropwDownList } from 'ui-components/input/MultipleDropwDownList';
import { user } from 'utils/auth';

function GroupCreation({ onSuccesfullSubmit, onCancel }) {
  const initialValues = {
    name: '',
    description: '',
    category: '',
    members: JSON.stringify([]),
  };

  const { data: users } = useAPIData(getUsers, { results: [] }, { results: [] });

  async function handleSubmit(values, { setStatus, setSubmitting }) {
    try {
      await groupCreate({...values, members: JSON.parse(values.members).map(u => u.id)});
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
        category: Yup.string().max(128).required('A category for the group is required'),
        members: Yup.string().jsonArray('There must be at least one other member besides you'),
      })}
    >
      {({ errors, status, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
        return (
          <Form className='h-full  w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4'>
            <p className='text-md font-semibold text-red-400 text-center'>{status}</p>
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

            <MultipleDropwDownList
              id={'members'}
              label={'Members'}
              options={users.results.filter(u => u.id !== user().sub)}
              initial={[]}
              inputRender={({ selected }) => `${selected.map((u) => u.username).join(' - ')}`}
              optionRender={({ value, isSelected }) => (
                <>
                  <span
                    className={`
                    w-full block text-md px-4 border-b py-1 last:border-b-0 border-slate-300
                      ${isSelected ? 'bg-purple-500 text-slate-50' : ''}
                      ${isSelected ? 'hover:bg-red-700' : 'hover:bg-purple-500 hover:text-slate-50'}
                    transition`}
                  >
                    {value.username}
                  </span>
                </>
              )}
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
