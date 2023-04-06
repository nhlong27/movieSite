import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnyZodObject } from 'zod';

interface FormComponentProps {
  schema: AnyZodObject;
  // submitFn: (...args: any[]) => any;
  submitFn: Function;
  options: Array<{ extras?: {[key:string]: string}, name: string; default?: string }>;
  submitBn?: string;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(props.schema),
    defaultValues: {
      ...props.options.reduce(
        (acc, curr) => ({ ...acc, [`${curr.name}`]: curr.default ?? null }),
        {},
      ),
    },
  });
  return (
    <div className='ring-2 ring-black p-4'>
      <form onSubmit={handleSubmit((formInputs) => props.submitFn(formInputs))}>
        <>
          {props.options.map((option, index) => {
            return (
              <div key={index}>
                <input {...option.extras} {...register(`${option.name}` as never)} />
                {(errors as any)[`${option.name}`]?.message && (
                  <>{(errors as any)[`${option.name}`]?.message}</>
                )}
              </div>
                
            );
          })}
          <button type='submit'>{props.submitBn ?? 'Submit'}</button>
        </>
      </form>
    </div>
  );
};

export default FormComponent;
