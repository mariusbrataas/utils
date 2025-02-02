import { InputHTMLAttributes } from 'react';
import { Field } from '../Field';

export function Input<T extends 'text' | 'number' | 'password' | 'email'>({
  value,
  onChange,
  placeholder,
  autofocus,
  type,
  id,
  name,
  label = name,
  status,
  prefix,
  ...props
}: {
  value?: T extends 'text' ? string : number;
  onChange?: T extends 'number'
    ? (value: number) => void
    : (value: string) => void;
  placeholder?: string;
  autofocus?: boolean;
  label?: string;
  type?: T;
  status?: string;
  prefix?: string;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'required' | 'id' | 'name' | 'pattern' | 'step' | 'min' | 'max'
>) {
  return (
    <Field className="text-left" label={label} htmlFor={id}>
      <div className="relative flex w-full cursor-default flex-row items-center rounded-md border-1 border-gray-200 bg-transparent px-3 outline-none transition-all focus-within:border-blue-500 dark:border-slate-600">
        {prefix ? (
          <span className="h-full w-fit pr-2 text-slate-600">{prefix}</span>
        ) : undefined}
        <input
          id={id}
          prefix="@"
          className="w-full cursor-text rounded-md border-none bg-transparent py-2 outline-none transition-all autofill:appearance-none autofill:bg-red-600 autofill:fill-white dark:border-slate-600"
          value={value}
          onChange={e =>
            (onChange as undefined | ((value: string | number) => void))?.(
              type === 'number' ? e.target.valueAsNumber : e.target.value
            )
          }
          placeholder={placeholder}
          autoFocus={autofocus}
          type={type}
          name={name}
          {...props}
        />
      </div>
      {status ? (
        <span className="block whitespace-pre-wrap text-sm font-light text-gray-500">
          {status}
        </span>
      ) : undefined}
    </Field>
  );
}
