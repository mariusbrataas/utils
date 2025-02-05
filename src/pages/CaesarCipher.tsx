import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Textfield';
import { useEffect, useState } from 'react';

abstract class CaesarCipher {
  /**
   * Encodes a message using the Caesar cipher.
   * @param message - The message to encode.
   * @param shift - The number of characters to shift.
   * @param alphabet - (Optional) The alphabet to use. Defaults to A-Z, a-z.
   * @returns The encoded message.
   */
  static encode(
    message: string,
    shift: number,
    alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
  ): string {
    return this.transform(message, shift, alphabet);
  }

  /**
   * Decodes a message using the Caesar cipher.
   * @param message - The encoded message.
   * @param shift - The number of characters to shift back.
   * @param alphabet - (Optional) The alphabet to use. Defaults to A-Z, a-z.
   * @returns The decoded message.
   */
  static decode(
    message: string,
    shift: number,
    alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
  ): string {
    return this.transform(message, -shift, alphabet);
  }

  /**
   * Transforms a message by shifting characters within a given alphabet.
   * @param message - The input message.
   * @param shift - The number of characters to shift.
   * @param alphabet - The alphabet to use.
   * @returns The transformed message.
   */
  private static transform(
    message: string,
    shift: number,
    alphabet: string
  ): string {
    // Normalize alphabet: ensure it contains both lower & uppercase versions
    const fullAlphabet = alphabet + alphabet.toUpperCase();
    return message
      .split('')
      .map(char => {
        const index = fullAlphabet.indexOf(char);
        if (index === -1) return char; // Preserve characters not in the alphabet
        const newIndex =
          (index + shift + fullAlphabet.length) % fullAlphabet.length;
        return fullAlphabet[newIndex];
      })
      .join('');
  }
}

export default function CaesarCipherUI() {
  const [decoded, setDecoded] = useState('');
  const [encoded, setEncoded] = useState('');
  const [lastEdited, setLastEdited] = useState<'encoded' | 'decoded'>(
    encoded ? 'encoded' : 'decoded'
  );
  const [shift, setShift] = useState(1);
  const [alphabet, setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const [incPunctuation, setIncPunctuation] = useState(false);
  const [incNumbers, setIncNumbers] = useState(false);

  const fullAlphabet = `${alphabet}${incPunctuation ? ",;.:-_@*+?!#$%&/()'" : ''}${incNumbers ? '0123456789' : ''}`;

  useEffect(() => {
    if (lastEdited === 'decoded') {
      setEncoded(
        CaesarCipher.encode(decoded, shift, fullAlphabet.toLowerCase())
      );
    } else {
      setDecoded(
        CaesarCipher.decode(encoded, shift, fullAlphabet.toLowerCase())
      );
    }
  }, [shift, fullAlphabet, decoded, encoded]);

  return (
    <div className="w-[640px] max-w-full text-left">
      <h2 className="mb-6">Caesar cipher</h2>

      <div className="mb-6">
        <div>
          <h3 className="font-bold">Shift</h3>
          <span className="inline-block">
            <Input
              type="number"
              value={shift}
              onChange={setShift}
              step={1}
              min={0}
              max={fullAlphabet.length - 1}
            />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Alphabet</h3>
          <span>
            <Input
              type="text"
              value={alphabet}
              onChange={value =>
                setAlphabet(
                  value
                    .toUpperCase()
                    .split('')
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .join('')
                )
              }
            />
          </span>
          <Checkbox
            label="Include symbols?"
            checked={incPunctuation}
            onChange={setIncPunctuation}
          />
          <Checkbox
            label="Include numbers?"
            checked={incNumbers}
            onChange={setIncNumbers}
          />
          <span className="text-sm">
            Using alphabet:{' '}
            <strong className="break-words">{fullAlphabet}</strong>
          </span>
        </div>
      </div>

      <div className="mb-6">
        <Area
          label="Decoded message"
          placeholder="Enter readable message here"
          value={decoded}
          onChange={value => {
            setLastEdited('decoded');
            setDecoded(value);
          }}
        />
      </div>

      <div>
        <Area
          label="Encoded message"
          placeholder="Enter encoded message here"
          value={encoded}
          onChange={value => {
            setLastEdited('encoded');
            setEncoded(value);
          }}
        />
      </div>
    </div>
  );
}

function Area({
  placeholder,
  label,
  value,
  spellcheck,
  onChange,
  autocapitalize,
  autocomplete,
  autocorrect,
  autofocus
}: {
  placeholder: string;
  label: string;
  value?: string;
  spellcheck?: boolean;
  onChange?: (value: string) => void;
} & {
  [key in `auto${'correct' | 'complete' | 'capitalize' | 'focus'}`]?: boolean;
}) {
  const content = value || placeholder || '';
  return (
    <div className="block">
      <div className="text-left">{label}</div>
      <div className="relative rounded-md bg-slate-200 px-4 py-2 dark:bg-slate-600">
        <div className="rounded-mdfont-[inherit] h-full w-full min-w-0 overflow-visible whitespace-pre-wrap text-transparent">
          {content + (content.endsWith('\n') ? ' ' : '')}
        </div>
        <textarea
          className="absolute inset-0 m-0 w-full min-w-0 resize-none overflow-hidden whitespace-pre-wrap rounded-md border-none bg-transparent px-4 py-2 font-[inherit] outline-none transition-all autofill:appearance-none dark:border-slate-600"
          autoCorrect={autocorrect ? '' : 'off'}
          autoComplete={autocomplete ? '' : 'off'}
          autoCapitalize={autocapitalize ? '' : 'off'}
          spellCheck={spellcheck ? 'true' : 'false'}
          autoFocus={autofocus}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange ? e => onChange(e.target.value) : undefined}
        />
      </div>
    </div>
  );
}
