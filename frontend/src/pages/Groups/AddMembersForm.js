import { Form, Formik } from 'formik';
import Button from 'ui-components/button/Button';
import * as Yup from 'yup';
import { addMembersToGroup, getInviteLink } from 'services/groups';
import { useAPIData } from 'hooks/useAPIData';
import { getUsers } from 'services/users';
import { MultipleDropwDownList } from 'ui-components/input/MultipleDropwDownList';
import { Input } from 'ui-components/input/Input';
import { LinkIcon } from '@heroicons/react/20/solid';
import { Loading } from 'logic-components/Loading';
import { createInviteLink } from 'utils/href';

function AddMembersForm({ onSuccesfullSubmit, onCancel, groupId, existingMembersInGroup }) {
  const initialValues = {
    members: JSON.stringify([]),
  };

  const { data: users } = useAPIData(getUsers, { results: [] }, { results: [] });
  async function handleSubmit(values, { setStatus, setSubmitting }) {
    try {
      await addMembersToGroup({ members: JSON.parse(values.members).map((u) => u.id) }, groupId);
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
        members: Yup.string().jsonArray('You must add at least one extra member'),
      })}
    >
      {({ errors, status, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
        return (
          <Form className='max-h-72 w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4'>
            <p className='text-md font-semibold text-red-400 text-center'>{status}</p>
            <MultipleDropwDownList
              id={'members'}
              label={'Members'}
              options={users.results.filter((u) => !existingMembersInGroup?.includes(u.id))}
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

            <InviteLink groupId={groupId}/>

            <div className='flex pt-10'>
              <div className='w-full'></div>

              <div className='w-full px-4'>
                <Button secondary type='cancel' onClick={onCancel} disabled={isSubmitting}>
                  <span className='text-md font-semibold tracking-wider'>Cancel</span>
                </Button>
              </div>

              <div className='w-full pl-4'>
                <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
                  <span className='text-md font-semibold tracking-wider'>Add Members</span>
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

const InviteLink = ({groupId}) => {
  const { data: invite, loading, error } = useAPIData(async() => await getInviteLink(groupId));
  return (
    <Loading loading={loading} error={error}>
      <div className='flex flex-row-reverse gap-10 justify-center items-center pt-10'>
        <Input
          disabled
          icon={<LinkIcon />}
          value={createInviteLink(invite?.inviteId)}
          className='text-slate-500 hover:text-purple-500 transition'
        ></Input>
      </div>
    </Loading>
  );
};

export default AddMembersForm;
