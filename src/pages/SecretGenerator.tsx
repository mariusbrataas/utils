import { Checkbox } from '@/components/Checkbox';
import { Field } from '@/components/Field';
import { Input } from '@/components/Textfield';
import { useEffect, useState } from 'react';

function generateSecretKey(options?: {
  includeSymbols?: boolean;
  includeNumbers?: boolean;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  length?: number;
}): string {
  const defaultOptions = {
    includeSymbols: false,
    includeNumbers: true,
    includeUppercase: true,
    includeLowercase: true,
    length: 64
  };

  const settings = { ...defaultOptions, ...options };

  // Character pools
  const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const numbers = '0123456789';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';

  // Build the pool of characters to pick from
  let tokens = '';
  if (settings.includeSymbols) tokens += symbols;
  if (settings.includeNumbers) tokens += numbers;
  if (settings.includeUppercase) tokens += uppercase;
  if (settings.includeLowercase) tokens += lowercase;

  if (tokens.length === 0) {
    throw new Error('At least one character type must be included.');
  }

  // Generate the key
  const key = Array.from({ length: settings.length })
    .map(() => tokens.charAt(Math.floor(Math.random() * tokens.length)))
    .join('');

  return key;
}

export default function SecretGenerator() {
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [length, setLength] = useState(64);

  const [key, setKey] = useState('');

  useEffect(() => {
    setKey(
      generateSecretKey({
        includeSymbols,
        includeNumbers,
        includeUppercase,
        includeLowercase,
        length
      })
    );
  }, [
    includeSymbols,
    includeNumbers,
    includeUppercase,
    includeLowercase,
    length
  ]);

  return (
    <div className="flex w-full flex-col items-start justify-between gap-6">
      <h2 className="text-left">Generate secret</h2>
      <div className="flex flex-col gap-4 text-left">
        <Field.Label>Include</Field.Label>
        <Checkbox
          label="Symbols"
          checked={includeSymbols}
          onChange={setIncludeSymbols}
        />
        <Checkbox
          label="Numbers"
          checked={includeNumbers}
          onChange={setIncludeNumbers}
        />
        <Checkbox
          label="Uppercase letters"
          checked={includeUppercase}
          onChange={setIncludeUppercase}
        />
        <Checkbox
          label="Lowercase letters"
          checked={includeLowercase}
          onChange={setIncludeLowercase}
        />
        <Input
          label="Length"
          type="number"
          value={length}
          onChange={setLength}
          min={0}
        />
      </div>
      <div className="w-full whitespace-pre-wrap break-words rounded-md bg-slate-200 px-4 py-2 font-mono">
        {key}
      </div>
    </div>
  );
}
