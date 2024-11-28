import { Button } from './components/Button';

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-gradient-to-br from-red-100 to-sky-200 dark:bg-gradient-to-tl dark:from-slate-950 dark:to-indigo-950">
      <div className="rounded-lg bg-white p-7">
        <Button href="#/risk-reward" gentle>
          Risk-reward-calculator {'>'}
        </Button>
      </div>
    </main>
  );
}
