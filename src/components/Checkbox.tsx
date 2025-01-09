import { InputHTMLAttributes } from 'react';
import { Field } from './Field';

export function Checkbox({
  label,
  id = label,
  onChange,
  ...props
}: { label?: string; onChange?: (nextState: boolean) => void } & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'required' | 'id' | 'name' | 'checked'
>) {
  return (
    <Field className="flex flex-row content-center items-center gap-2">
      <input
        id={id}
        type="checkbox"
        {...props}
        onChange={e => onChange?.(e.target.checked)}
      />
      {label ? (
        <Field.Label htmlFor={id} className="mb-0 font-normal">
          {label}
        </Field.Label>
      ) : undefined}
    </Field>
  );
}
