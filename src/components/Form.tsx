import { PropsWithChildren } from 'react';

export function Form<T extends string>({
  children,
  className,
  onSubmit
}: PropsWithChildren<{
  className?: string;
  onSubmit?: (values: Record<T, FormDataEntryValue>) => any;
}>) {
  return (
    <form
      className={className}
      onSubmit={event => {
        event.preventDefault();
        onSubmit?.(
          new FormData(event.target as HTMLFormElement).entries().reduce(
            (acc, [key, value]) => {
              acc[key as T] = value as string;
              return acc;
            },
            {} as Record<T, string>
          )
        );
      }}
    >
      {children}
    </form>
  );
}
