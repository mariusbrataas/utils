import { useMemo } from 'react';

export function Candles() {
  const candles = useMemo(() => nvdaCandles, []);
  const min = useMemo(
    () => Math.min(...candles.map(candle => candle.low)),
    [candles]
  );
  const max = useMemo(
    () => Math.max(...candles.map(candle => candle.high)),
    [candles]
  );

  return (
    <>
      {/* <pre>
        {JSON.stringify(
          candles.map(({ open, high, low, close }) => [open, high, low, close]),
          undefined,
          2
        )}
        {JSON.stringify({ min, max }, undefined, 2)}
      </pre> */}
      <div className="flex h-28 w-full flex-row gap-1 overflow-visible border-1 border-solid border-blue-400">
        {candles.map(({ open, high, low, close }) => (
          <Candle
            open={open}
            high={high}
            low={low}
            close={close}
            min={min}
            max={max}
          />
        ))}
      </div>
    </>
  );
}

function Candle({
  open,
  high,
  low,
  close,
  min,
  max
}: ICandle & { min: number; max: number }) {
  const bullish = open < close;
  const space = max - min;
  return (
    <div className={`candle candle-${bullish ? 'bullish' : 'bearish'}`}>
      <div
        className="candle-spacing"
        style={{ height: `${((max - high) / space) * 100}%` }}
      />
      <div
        className="candle-wick candle-wick-high"
        style={{ height: `${((high - Math.max(open, close)) / space) * 100}%` }}
      />
      <div
        className="candle-body"
        style={{
          height: `${(Math.abs(open - close) / space) * 100}%`
        }}
      />
      <div
        className="candle-wick candle-wick-low"
        style={{ height: `${((Math.min(open, close) - low) / space) * 100}%` }}
      />
    </div>
  );
}

function generateCandles(count: number): ICandle[] {
  let middle = 0;

  return Array.from({ length: count }, () => {
    // const middle = Math.max(10, Math.min(90, prevMiddle * mult));
    const bullish = Math.random() > 0.2;
    middle = middle + Math.random() * (bullish ? 1 : -1) * 0.1;

    const wickMult = middle;

    const [open, close] = bullish
      ? // Bullish
        [
          middle + (1 + Math.random() * wickMult),
          middle + (1 - Math.random() * wickMult)
        ]
      : // Bearish
        [
          middle + (1 - Math.random() * wickMult),
          middle + (1 + Math.random() * wickMult)
        ];

    const high = Math.max(open, close) * (1 + Math.random() * 0.05);
    const low = Math.min(open, close) * (1 - Math.random() * 0.05);

    return { open, high, low, close };
  });
}

type ICandle = Record<'open' | 'high' | 'low' | 'close', number>;

export const nvdaCandles = [
  {
    timestamp: 1738247400,
    open: 123.08000183105469,
    high: 124.1500015258789,
    low: 121.91999816894531,
    close: 122.21499633789062,
    volume: 22975509
  },
  {
    timestamp: 1738247700,
    open: 122.2300033569336,
    high: 122.83999633789062,
    low: 121.81999969482422,
    close: 121.9896011352539,
    volume: 6754568
  },
  {
    timestamp: 1738248000,
    open: 122,
    high: 122.06999969482422,
    low: 121.25,
    close: 121.66000366210938,
    volume: 7079469
  },
  {
    timestamp: 1738248300,
    open: 121.6541976928711,
    high: 123.4000015258789,
    low: 121.52999877929688,
    close: 123.22010040283203,
    volume: 6551332
  },
  {
    timestamp: 1738248600,
    open: 123.2300033569336,
    high: 123.48999786376953,
    low: 122.70999908447266,
    close: 122.87650299072266,
    volume: 4732811
  },
  {
    timestamp: 1738248900,
    open: 122.86000061035156,
    high: 122.93000030517578,
    low: 121.83000183105469,
    close: 122.16500091552734,
    volume: 4575677
  },
  {
    timestamp: 1738249200,
    open: 122.18000030517578,
    high: 122.30000305175781,
    low: 121.27999877929688,
    close: 121.80999755859375,
    volume: 5298218
  },
  {
    timestamp: 1738249500,
    open: 121.79000091552734,
    high: 121.87000274658203,
    low: 121.08999633789062,
    close: 121.25,
    volume: 5598316
  },
  {
    timestamp: 1738249800,
    open: 121.26000213623047,
    high: 122.0999984741211,
    low: 121.0999984741211,
    close: 121.28500366210938,
    volume: 4610452
  },
  {
    timestamp: 1738250100,
    open: 121.28019714355469,
    high: 121.37999725341797,
    low: 120.44999694824219,
    close: 120.70999908447266,
    volume: 6724269
  },
  {
    timestamp: 1738250400,
    open: 120.7300033569336,
    high: 121.01499938964844,
    low: 120.12000274658203,
    close: 120.86000061035156,
    volume: 6687024
  },
  {
    timestamp: 1738250700,
    open: 120.86579895019531,
    high: 120.88999938964844,
    low: 119.44999694824219,
    close: 119.56999969482422,
    volume: 8941018
  },
  {
    timestamp: 1738251000,
    open: 119.5813980102539,
    high: 119.77059936523438,
    low: 118.75,
    close: 119.19499969482422,
    volume: 8311888
  },
  {
    timestamp: 1738251300,
    open: 119.19999694824219,
    high: 119.94999694824219,
    low: 119.1948013305664,
    close: 119.91000366210938,
    volume: 4677351
  },
  {
    timestamp: 1738251600,
    open: 120.03520202636719,
    high: 120.12999725341797,
    low: 119.48999786376953,
    close: 119.5198974609375,
    volume: 7385961
  },
  {
    timestamp: 1738251900,
    open: 119.52999877929688,
    high: 120.05999755859375,
    low: 119.43000030517578,
    close: 119.9800033569336,
    volume: 5618759
  },
  {
    timestamp: 1738252200,
    open: 119.98999786376953,
    high: 120.00499725341797,
    low: 118.62000274658203,
    close: 118.68350219726562,
    volume: 6595623
  },
  {
    timestamp: 1738252500,
    open: 118.69000244140625,
    high: 119.1500015258789,
    low: 118.51000213623047,
    close: 118.55999755859375,
    volume: 5130837
  },
  {
    timestamp: 1738252800,
    open: 118.55999755859375,
    high: 119.12999725341797,
    low: 118.25,
    close: 119.11100006103516,
    volume: 6256313
  },
  {
    timestamp: 1738253100,
    open: 119.11499786376953,
    high: 119.12000274658203,
    low: 118.2699966430664,
    close: 118.29499816894531,
    volume: 4275068
  },
  {
    timestamp: 1738253400,
    open: 118.29000091552734,
    high: 118.55000305175781,
    low: 118.13999938964844,
    close: 118.19000244140625,
    volume: 4198977
  },
  {
    timestamp: 1738253700,
    open: 118.18499755859375,
    high: 118.7300033569336,
    low: 118.0999984741211,
    close: 118.55999755859375,
    volume: 4679007
  },
  {
    timestamp: 1738254000,
    open: 118.56710052490234,
    high: 119.0198974609375,
    low: 118.43000030517578,
    close: 118.9999008178711,
    volume: 4013362
  },
  {
    timestamp: 1738254300,
    open: 118.99829864501953,
    high: 119.30000305175781,
    low: 118.66000366210938,
    close: 119.05470275878906,
    volume: 2911193
  },
  {
    timestamp: 1738254600,
    open: 119.05010223388672,
    high: 119.25,
    low: 118.5,
    close: 118.56999969482422,
    volume: 3809130
  },
  {
    timestamp: 1738254900,
    open: 118.56500244140625,
    high: 118.97000122070312,
    low: 118.44000244140625,
    close: 118.95999908447266,
    volume: 3075924
  },
  {
    timestamp: 1738255200,
    open: 118.95500183105469,
    high: 119.29000091552734,
    low: 118.7300033569336,
    close: 119.19270324707031,
    volume: 2122732
  },
  {
    timestamp: 1738255500,
    open: 119.29000091552734,
    high: 119.56999969482422,
    low: 119.18000030517578,
    close: 119.49500274658203,
    volume: 4354209
  },
  {
    timestamp: 1738255800,
    open: 119.49009704589844,
    high: 120.44000244140625,
    low: 119.4000015258789,
    close: 120.37149810791016,
    volume: 3926840
  },
  {
    timestamp: 1738256100,
    open: 120.375,
    high: 120.88999938964844,
    low: 120.18379974365234,
    close: 120.58499908447266,
    volume: 4510592
  },
  {
    timestamp: 1738256400,
    open: 120.58000183105469,
    high: 120.58499908447266,
    low: 119.81500244140625,
    close: 120.01000213623047,
    volume: 3670005
  },
  {
    timestamp: 1738256700,
    open: 120.0199966430664,
    high: 120.04000091552734,
    low: 119.6500015258789,
    close: 119.96820068359375,
    volume: 2701835
  },
  {
    timestamp: 1738257000,
    open: 119.97000122070312,
    high: 120.2300033569336,
    low: 119.73079681396484,
    close: 119.9000015258789,
    volume: 4629267
  },
  {
    timestamp: 1738257300,
    open: 119.9000015258789,
    high: 120.0199966430664,
    low: 119.42960357666016,
    close: 119.5199966430664,
    volume: 2330218
  },
  {
    timestamp: 1738257600,
    open: 119.5199966430664,
    high: 119.7699966430664,
    low: 119.47000122070312,
    close: 119.67500305175781,
    volume: 2255390
  },
  {
    timestamp: 1738257900,
    open: 119.66999816894531,
    high: 119.70999908447266,
    low: 119.0999984741211,
    close: 119.29000091552734,
    volume: 2311616
  },
  {
    timestamp: 1738258200,
    open: 119.28500366210938,
    high: 119.7699966430664,
    low: 119.11000061035156,
    close: 119.73480224609375,
    volume: 1849926
  },
  {
    timestamp: 1738258465,
    open: 119.69930267333984,
    high: 119.69930267333984,
    low: 119.69930267333984,
    close: 119.69930267333984,
    volume: 0
  }
];
