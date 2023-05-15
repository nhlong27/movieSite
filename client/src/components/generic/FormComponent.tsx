import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnyZodObject } from 'zod';
import ButtonComponent from './ButtonComponent';

import { AiFillEdit } from 'react-icons/ai';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface FormComponentProps {
  schema: AnyZodObject;
  // submitFn: (...args: any[]) => any;
  submitFn: Function;
  options: Array<{ extras?: { [key: string]: string }; name: string; default?: string }>;
  submitBn?: any;
  styles?: Record<string, string>;
}

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    <form
      className={props.styles?.form}
      onSubmit={handleSubmit((formInputs) => props.submitFn(formInputs))}
    >
      <>
        {props.options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              <div className={`capitalize ${props.styles?.inputName}`}>
                {option.name}
                <AiFillEdit />
              </div>
              <input
                className={props.styles?.input}
                {...option.extras}
                {...register(`${option.name}` as never)}
              />
              {(errors as any)[`${option.name}`]?.message && (
                <div className={`flex items-center gap-2 text-red-700 ${props.styles?.error}`}>
                  <HiOutlineExclamationCircle className='text-lg' />
                  {(errors as any)[`${option.name}`]?.message}
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div className='flex justify-between items-center w-full'>
        <ButtonComponent className='text-stone-400' onClick={()=>reset()}>
          Reset
        </ButtonComponent>
        <ButtonComponent className={props.styles?.button} type='submit'>
          {props.submitBn ?? 'Submit'}
        </ButtonComponent>
        </div>
      </>
    </form>
  );
};

export default FormComponent;
