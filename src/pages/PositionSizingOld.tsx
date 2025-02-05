import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Textfield';
import { useState } from 'react';

export default function PositionSizing() {
  const [high = 242.04, setHigh] = useState<number>(242.04);
  const [low = 238.03, setLow] = useState<number>(238.03);

  const [capital = 5000, setCapital] = useState<number>(5000);
  const [leverage = 1, setLeverage] = useState<number>(1);
  const [discrete, setDiscrete] = useState(false);

  const diff = high - low;

  const takeProfit = low + diff * 1.272;
  const entry = low + diff * 0.618;
  const dip1 = low + diff * 0.382;
  const dip2 = low + diff * 0.17;
  const stopLoss = low + diff * -0.05;

  const continuousVolume = (capital * leverage) / entry;
  const volume = discrete ? Math.floor(continuousVolume) : continuousVolume;

  const profit = volume * (takeProfit - entry);

  return (
    <div className="flex w-full flex-col items-start justify-between gap-6 text-left">
      <h2>Position sizing</h2>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Input
            type="number"
            label="Capital"
            prefix="$"
            placeholder="5000"
            value={capital}
            onChange={setCapital}
          />
          <Input
            type="number"
            label="Leverage"
            prefix="X"
            placeholder="1"
            value={leverage}
            onChange={setLeverage}
            min={1}
            max={1000}
            step={1}
          />
          <Checkbox
            label="Buy discrete units?"
            checked={discrete}
            onChange={setDiscrete}
          />
          <span>Volume to buy: {volume}</span>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type="number"
            label="High"
            prefix="$"
            placeholder="242.04"
            value={high}
            onChange={setHigh}
          />
          <Input
            type="number"
            label="Low"
            prefix="$"
            placeholder="238.03"
            value={low}
            onChange={setLow}
          />
        </div>
      </div>

      <pre>
        {JSON.stringify(
          { takeProfit, entry, dip1, dip2, stopLoss, profit },
          undefined,
          2
        )}
      </pre>
    </div>
  );
}

// function fetchYahooFinanceData(symbol: string): Promise<
//   {
//     timestamp: number;
//     open: number;
//     high: number;
//     low: number;
//     close: number;
//     volume: number;
//   }[]
// > {
//   return fetch(
//     `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=5m`
//   )
//     .then(r => r.json())
//     .then(data => {
//       const result = data.chart.result?.[0];
//       if (!result) throw new Error('Invalid response from Yahoo Finance');

//       const timestamps = result.timestamp;
//       const quotes = result.indicators.quote?.[0];

//       return timestamps.map((timestamp: number, index: number) => ({
//         timestamp, // Unix timestamp
//         open: quotes.open?.[index] ?? null,
//         high: quotes.high?.[index] ?? null,
//         low: quotes.low?.[index] ?? null,
//         close: quotes.close?.[index] ?? null,
//         volume: quotes.volume?.[index] ?? null
//       }));
//     });
// }
