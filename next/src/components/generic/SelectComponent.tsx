import React from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

interface SelectComponentProps {
  options: { value: string | number; label: string }[];
  name: string;
  className: string;
  placeholder?: string;
  handleOnChange: Function;
  extras: { [key: string]: any };
}

const SelectComponent: React.FC<SelectComponentProps> = (props) => {
  const { options, name, className, placeholder, extras, handleOnChange } = props;

  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, name, onChange, value, ref } }) => (
          <Select
            name={name}
            onBlur={onBlur}
            ref={ref}
            value={options.filter((c) => value?.includes(c.value))}
            onChange={(val) => {
              onChange(val?.value?.toString());
              handleOnChange(val)
              
            }}
            options={options}
            className={className}
            placeholder={placeholder ?? 'None'}
            {...extras}
          
          />
        )}
      />
      {(errors as any)[`${options}`]?.message && <>{(errors as any)[`${options}`]?.message}</>}
    </>
  );
};

export default SelectComponent;
