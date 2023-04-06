import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FormComponent from '@/components/generic/FormComponent';
import { useDeactivateUserMutation } from '../../hooks/useDeactivateUserMutation';
import { UserDeactivateForm } from '../../types';

const DeactivateRequestContainer = () => {
  const deactivateUserMutation = useDeactivateUserMutation();

  const navigate = useNavigate();

  return (
    <div>
      <Toaster />
      <FormComponent
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
                console.log('Update info success!');
                navigate(0);
              } catch (e: any) {
                console.log(e);
                toast('Server error. Please retry.');
              }
            },
          })
        }
        options={[{ extras: { type: 'password' }, name: 'password' }]}
        submitBn={'Deactivate'}
      />
    </div>
  );
};

export default DeactivateRequestContainer;
