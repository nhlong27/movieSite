import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnyZodObject } from 'zod';
import ButtonComponent from './ButtonComponent';
import { iconHelper } from '@/config/icons';

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
              <div className={`capitalize ${props.styles?.inputName}`}>{option.name.replace(/_/g, ' ')}</div>
              <input
                className={props.styles?.input}
                {...option.extras}
                {...register(`${option.name}` as never)}
              />
              {(errors as any)[`${option.name}`]?.message && (
                <div className={`flex items-center gap-2 text-white bg-stone-900 rounded-xl px-4 py-2 mt-2 ${props.styles?.error}`}>
                  {iconHelper.exclamation('text-4xl')}
                  {(errors as any)[`${option.name}`].message}
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div className='flex justify-between items-center w-full'>
          {!props.styles?.reset && <ButtonComponent className='text-stone-400 dark:text-stone-500' onClick={() => reset()}>
            Reset
          </ButtonComponent>}
          <ButtonComponent className={props.styles?.button} type='submit'>
            {props.submitBn ?? 'Submit'}
          </ButtonComponent>
        </div>
      </>
    </form>
  );
};

export default FormComponent;
