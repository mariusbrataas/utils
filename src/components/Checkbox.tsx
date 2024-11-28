import { InputHTMLAttributes } from 'react';
import { Field } from './Field';

export function Checkbox({
  label,
  id,
  ...props
}: { label?: string } & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'required' | 'id' | 'name'
>) {
  return (
    <Field className="flex flex-row content-center items-center gap-2">
      <input id={id} type="checkbox" {...props} />
      {label ? (
        <Field.Label htmlFor={id} className="mb-0 font-normal">
          {label}
        </Field.Label>
      ) : undefined}
    </Field>
  );
}
