import React from 'react';
import BaseBackground from 'ui-components/layouts/BaseBackground';
import { Card } from 'ui-components/card/Card';
import { LabeledAmountInput } from 'ui-components/input/LabeledAmountInput';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import Button from 'ui-components/button/Button';
import { classNames } from 'utils/classNames';
import { DropdownList } from 'ui-components/input/DropdownList';
import { categories } from 'utils/categories';
import { debtors } from 'utils/debtors';

import { Form, Formik } from 'formik';
import { PlusIcon } from '@heroicons/react/20/solid';

async function handleSubmit(values, { setErrors, setStatus, setSubmitting }) {
    console.log(values);
    setSubmitting(false);
}

const TicketCreate = () => {
    return (
        <BaseBackground>
            <Card>
                <Formik
                    initialValues={{
                        amount: 0,
                        category: '',
                        debtor: '',
                        comments: '',
                    }}
                    // validationSchema={
                    //   Yup.object().shape({
                    //     email: Yup.string().email('Must be a valid email').max(255).required(),
                    //     password: Yup.string.max(30).required('Password is required'),
                    //   })
                    // }
                    onSubmit={handleSubmit}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
                        return (
                            <Form>
                                <LabeledInput id='amount' type='number' step='0.01' placeholder='0.00' label='Monto' onChange={handleChange} />
                                <DropdownList
                                    label='Categoría'
                                    options={categories}
                                    renderOption={(option, isSelected, _) => {
                                        return (
                                            <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                {option.emoji} {option.name}
                                            </span>
                                        );
                                    }}
                                    renderDisplay={(selected) => {
                                        return (
                                            <span className='ml-3 block truncate'>
                                                {' '}
                                                {selected.emoji} {selected.name}
                                            </span>
                                        );
                                    }}
                                    initial={categories.find(({ id }) => id === 'home')}
                                    id='category'
                                    onChange={handleChange}
                                />
                                <DropdownList
                                    label='Deudor'
                                    options={debtors}
                                    renderOption={(option, isSelected, _) => {
                                        return (
                                            <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                {option.name}
                                            </span>
                                        );
                                    }}
                                    renderDisplay={(selected) => {
                                        return (
                                            <span className='ml-3 block truncate'>
                                                {' '}
                                                {selected.name}
                                            </span>
                                        );
                                    }}
                                    initial={debtors.find(({ id }) => id === 'usr2')}
                                    id='debtor'
                                    onChange={handleChange}
                                />

                                <LabeledInput id='comments' label='Comentarios' placeholder='Ingrese sus Comentarios' onChange={handleChange} />

                                <div className='flex flex-row-reverse mt-3'>
                                    <Button type='submit' onClick={handleSubmit} className="w-1/4" bgcolor="bg-green-500" focusoutlinecolor="outline-green-600" hovercolor="bg-green-600">
                                        {/* <PlusIcon className='h-6 w-6 mr-1' /> */}
                                        <span className='text-lg sm:text-md'>Guardar</span>
                                        {/* <span>
                                            <svg
                                                className='h-6 w-6'
                                                fill='none'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                            >
                                                <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                                            </svg>
                                        </span> */}
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Card>
        </BaseBackground >
    );
}

export default TicketCreate