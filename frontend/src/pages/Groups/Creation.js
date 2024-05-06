import { LabeledInput } from 'ui-components/input/LabeledInput'
import { Form, Formik } from 'formik'
import Button from 'ui-components/button/Button';
import * as Yup from 'yup';

const PORT = '3011' // poner aca el port del back

function GroupCreation() {
  const initialValues = {
    name: "",
    description: '',
    category: ''
  }

  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    console.log(values)
    return fetch(`http://localhost:${PORT}/group/create`).then((response) => {
      return response.json();
    });
  }
  return (
    <div className='p-10 flex flex-col gap-10'>
      <div className='font-bold text-4xl'>Create group</div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={
          Yup.object().shape({
            name: Yup.string().max(30).required('Name for the group is required'),
            description: Yup.string().max(255).nullable(),
            category:Yup.string().max(255).nullable(),
          })
        }
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          return (
            <Form className='w-3/5'>
              <LabeledInput id='name' label='Name' onChange={handleChange} />
              {errors?.name && <div className='mb-2 text-red-400'>*{errors.name}</div>}
              <LabeledInput id='description' label='Description' onChange={handleChange} />
              <LabeledInput id='category' label='Category' onChange={handleChange} />
              <div className='flex w-full mt-3'>
                <Button type='submit' onClick={handleSubmit}>
                  <span className='mr-2 text-lg sm:text-md'>Create Group</span>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}

export default GroupCreation
