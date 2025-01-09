import { Button } from './components/Button';
import { useSearchParam } from './hooks/useSearchParam';
import RiskRewardCalc from './pages/RiskRewardCalc';
import SecretGenerator from './pages/SecretGenerator';

export default function Home() {
  const tool = useSearchParam<undefined | string>('t', undefined)[0];

  switch (tool) {
    case 'rw':
      return <RiskRewardCalc />;
    case 'sg':
      return <SecretGenerator />;
    default:
      return (
        <main className="flex items-center justify-center bg-gradient-to-br from-red-100 to-sky-200 dark:bg-gradient-to-tl dark:from-slate-950 dark:to-indigo-950">
          <div className="flex max-w-screen-md flex-row flex-wrap gap-4 rounded-lg bg-white p-7">
            <Button href={`?t=rw`} filled>
              Risk-reward-calculator {'>'}
            </Button>
            <Button href={`?t=sg`} filled>
              Secret generator {'>'}
            </Button>
          </div>
        </main>
      );
  }
}
