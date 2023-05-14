import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FormComponent from '@/components/generic/FormComponent';
import { useDeactivateUserMutation } from '../../hooks/useDeactivateUserMutation';
import { UserDeactivateForm } from '../../types';
import { AiOutlinePoweroff } from 'react-icons/ai';

const DeactivateRequestContainer = () => {
  const deactivateUserMutation = useDeactivateUserMutation();

  const navigate = useNavigate();

  return (
    <div className='w-11/12 py-2'>
      <Toaster />
      <FormComponent
        styles={{
          form: 'bg-stone-200 gap-2 flex flex-col',
          input: 'bg-stone-300 rounded-sm pl-2 text-stone-400',
          button:
            'ml-auto px-2 py-2  rounded-lg mt-4 bg-stone-300 ring-2 ring-red-500 text-red-600 text-base font-bold hover:bg-red-600 hover:text-stone-100',
          inputName:
            'font-bold text-stone-500 text-lg flex items-center justify-between gap-4 pr-2',
        }}
        schema={UserDeactivateForm}
        submitFn={(formInputs: any) =>
          deactivateUserMutation.mutate(formInputs.password, {
            onError: (e: any) => {
              console.log(e);
              toast(e.message + '. ' + e.response.data);
            },
            onSuccess: (response) => {
              try {
                console.log(response.data);
                console.log('Deactivated user.');
                navigate(0);
              } catch (e: any) {
                console.log(e);
                toast('Server error. Please retry.');
              }
            },
          })
        }
        options={[{ extras: { type: 'password' }, name: 'password' }]}
        submitBn={
          <span className='flex items-center gap-2'>
            <AiOutlinePoweroff className='text-lg' /> Deactivate
          </span>
        }
      />
    </div>
  );
};

export default DeactivateRequestContainer;
