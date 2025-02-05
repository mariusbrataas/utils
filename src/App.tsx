import { PropsWithChildren } from 'react';
import { Button } from './components/Button';
import './globals.scss';
import { useSearchParam } from './hooks/useSearchParam';
import CaesarCipherUI from './pages/CaesarCipher';
import PositionSizing from './pages/PositionSizing';
import RiskRewardCalc from './pages/RiskRewardCalc';
import SecretGenerator from './pages/SecretGenerator';

function Main({ children }: PropsWithChildren) {
  return (
    <main className="flex items-center justify-center bg-gradient-to-br from-red-100 to-sky-200 dark:bg-gradient-to-tl dark:from-gray-950 dark:to-gray-900">
      <div className="m-2 flex min-h-32 w-dvw min-w-32 max-w-[95vw] flex-col gap-5 overflow-hidden rounded-2xl bg-white p-7 text-center sm:w-fit sm:rounded-lg dark:bg-slate-800 dark:text-white">
        <div className="flex w-full flex-col items-start justify-between gap-6">
          {children}
        </div>
      </div>
    </main>
  );
}

function Nav() {
  const tool = useSearchParam<undefined | string>('t', undefined)[0];

  switch (tool) {
    case 'rw':
      return <RiskRewardCalc />;
    case 'sg':
      return <SecretGenerator />;
    case 'ps':
      return <PositionSizing />;
    case 'cs':
      return <CaesarCipherUI />;
    default:
      return (
        <div className="flex max-w-screen-md flex-row flex-wrap gap-4">
          <Button href={`?t=rw`} filled>
            Risk-reward-calculator {'>'}
          </Button>
          <Button href={`?t=sg`} filled>
            Secret generator {'>'}
          </Button>
          <Button href={`?t=ps`} filled>
            Position sizing {'>'}
          </Button>
          <Button href={`?t=cs`} filled>
            Caesar Cipher {'>'}
          </Button>
        </div>
      );
  }
}

export default function Home() {
  return (
    <Main>
      <Nav />
    </Main>
  );
}
