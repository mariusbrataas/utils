import { Button } from './components/Button';
import { useSearchParam } from './hooks/useSearchParam';
import RiskRewardCalc from './pages/RiskRewardCalc';

export default function Home() {
  const tool = useSearchParam<undefined | string>('t', undefined)[0];

  switch (tool) {
    case 'rw':
      return <RiskRewardCalc />;
    default:
      return (
        <main className="flex items-center justify-center bg-gradient-to-br from-red-100 to-sky-200 dark:bg-gradient-to-tl dark:from-slate-950 dark:to-indigo-950">
          <div className="rounded-lg bg-white p-7">
            <Button href={`?t=rw`} gentle>
              Risk-reward-calculator {'>'}
            </Button>
          </div>
        </main>
      );
  }
}
