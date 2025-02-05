import { cn } from '@/lib/classNames';
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from 'react';
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
  suffix,
  filled,
  ...props
}: {
  value?: T extends 'text' ? string : number;
  onChange?: T extends 'number'
    ? (value: number) => void
    : (value: string) => void;
  placeholder?: string | number;
  autofocus?: boolean;
  label?: string;
  type?: T;
  status?: ReactNode;
  prefix?: string;
  suffix?: string;
  filled?: boolean;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'required' | 'id' | 'name' | 'pattern' | 'step' | 'min' | 'max'
>) {
  // Maintain an internal string state to allow in‑progress entries.
  const [inputValue, setInputValue] = useState(
    value == null ? '' : value.toString()
  );

  // Update the internal state if the external value changes.
  useEffect(() => {
    setInputValue(value == null ? '' : value.toString());
  }, [value]);

  // Destructure min, max, and step from the extra props.
  const { min, max, step } = props;

  // Helper: determine the number of decimal places from the step value.
  const getStepPrecision = (stepVal: number): number => {
    const stepStr = stepVal.toString();
    // Handle scientific notation if needed.
    if (stepStr.indexOf('e-') >= 0) {
      const [, exp] = stepStr.split('e-');
      return Number(exp);
    }
    const decimalIndex = stepStr.indexOf('.');
    return decimalIndex >= 0 ? stepStr.length - decimalIndex - 1 : 0;
  };

  /**
   * commitNumber
   *
   * Adjusts a parsed numeric value to respect the provided min, max, and step.
   */
  const commitNumber = (n: number): number => {
    let committed = n;

    // Clamp to min if needed.
    if (min !== undefined) {
      const minVal = typeof min === 'string' ? parseFloat(min) : min;
      if (!isNaN(minVal) && committed < minVal) {
        committed = minVal;
      }
    }
    // Clamp to max if needed.
    if (max !== undefined) {
      const maxVal = typeof max === 'string' ? parseFloat(max) : max;
      if (!isNaN(maxVal) && committed > maxVal) {
        committed = maxVal;
      }
    }
    // Snap to the nearest step if provided.
    if (step !== undefined) {
      const stepVal = typeof step === 'string' ? parseFloat(step) : step;
      if (!isNaN(stepVal) && stepVal !== 0) {
        let base = 0;
        if (min !== undefined) {
          const minVal = typeof min === 'string' ? parseFloat(min) : min;
          if (!isNaN(minVal)) {
            base = minVal;
          }
        }
        // Do the snapping calculation.
        committed = Math.round((committed - base) / stepVal) * stepVal + base;
        // Fix floating point issues by rounding to the proper precision.
        const precision = getStepPrecision(stepVal);
        committed = Number(committed.toFixed(precision));
      }
    }
    return committed;
  };

  /**
   * isCompleteNumber
   *
   * Returns true only if the input string represents a “complete” number.
   * For example, while "-0" is mathematically valid, we consider it incomplete so
   * that a user can continue typing a negative decimal.
   */
  const isCompleteNumber = (s: string): boolean => {
    // Must match a pattern with at least one digit before (and if applicable after) a dot.
    if (!/^-?\d+(\.\d+)?$/.test(s)) return false;
    // Treat a lone "-0" as incomplete.
    if (s === '-0') return false;
    // Also, if it begins with "-0" but the third character isn’t a dot (e.g. "-01"),
    // consider it incomplete.
    if (s.startsWith('-0') && s.length > 2 && s[2] !== '.') return false;
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (type === 'number') {
      // Allow only characters that could eventually form a valid number.
      if (/^-?\d*\.?\d*$/.test(newValue)) {
        setInputValue(newValue);

        // If we have a complete number, parse and "commit" it with constraints.
        if (isCompleteNumber(newValue)) {
          const parsed = parseFloat(newValue);
          const committed = commitNumber(parsed);
          onChange?.(committed as never);
        } else {
          // For incomplete numbers (like "", "-", or "-0"), signal no valid number.
          onChange?.(undefined as never);
        }
      }
    } else {
      // For non-number types, just update and pass along the raw value.
      setInputValue(newValue);
      onChange && onChange(newValue as never);
    }
  };

  const handleBlur = () => {
    if (type === 'number') {
      if (isCompleteNumber(inputValue)) {
        const parsed = parseFloat(inputValue);
        const committed = commitNumber(parsed);
        // If committing changes the value (e.g. snapping or clamping), update the display.
        if (committed.toString() !== inputValue) {
          setInputValue(committed.toString());
        }
        onChange?.(committed as never);
      } else {
        // Clear the input on blur if the value is incomplete.
        setInputValue('');
        onChange?.(undefined as never);
      }
    }
  };

  return (
    <Field className="text-left" label={label} htmlFor={id}>
      <div
        className={cn(
          'relative flex max-w-full cursor-default flex-row items-center rounded-md border-1 px-3 outline-none transition-all focus-within:border-blue-500',
          filled
            ? 'border-transparent bg-slate-100 dark:bg-slate-900'
            : 'border-gray-200 bg-transparent dark:border-slate-600'
        )}
      >
        {prefix ? (
          <span className="h-full w-fit pr-2 text-slate-600">{prefix}</span>
        ) : null}
        <input
          id={id}
          className="w-full cursor-text rounded-md border-none bg-transparent py-2 outline-none transition-all autofill:appearance-none autofill:bg-red-600 autofill:fill-white dark:border-slate-600"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder == null ? undefined : `${placeholder}`}
          autoFocus={autofocus}
          type={type}
          name={name}
          {...props}
        />
        {suffix ? (
          <span className="h-full w-fit pr-2 text-slate-600">{suffix}</span>
        ) : null}
      </div>
      {status ? (
        <span className="block whitespace-nowrap text-sm font-light text-gray-500">
          {status}
        </span>
      ) : null}
    </Field>
  );
}
