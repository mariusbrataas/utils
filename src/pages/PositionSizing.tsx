import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Strong } from '@/components/Helpers';
import { formatNumber, PrettyNumber } from '@/components/Num';
import { Input } from '@/components/Textfield';
import { useSearchParam } from '@/hooks/useSearchParameter';
import { round } from '@/lib/utils';
import { ActionsSummary } from './PositionSizing.ActionsSummary';

const DEFAULT_VALUES = {
  entry: 2.8249,
  takeProfit: 2.6643,
  stopLoss: 2.8494,
  capital: 1000,
  risk: 100,
  maxLeverage: 125
};

function riskEmoji(risk: number) {
  if (risk > 7) return '🚀';
  if (risk > 4) return '🔥';
  if (risk > 3) return '🧐';
  if (risk > 2.5) return '😬';
  if (risk > 2) return '💩';
  return '☠️';
}

export default function PositionSizing() {
  const [entryState, setEntry] = useSearchParam<number>('entry');
  const [takeProfitState, setTakeProfit] = useSearchParam<number>('tp');
  const [stopLossState, setStopLoss] = useSearchParam<number>('sl');

  const [capitalState, setCapital] = useSearchParam<number>('capital');
  const [riskState, setRisk] = useSearchParam<number>('ra');
  const [discrete, setDiscrete] = useSearchParam<boolean>('discrete');

  const [maxLeverage, setMaxLeverage] = useSearchParam<number>('ml');

  const [trailingStops, setTrailingStops] = useSearchParam<
    [triggerR: number, lockR: number][]
  >('ts', [
    [2, 0],
    [4, 1]
  ]);

  const entry = entryState ?? DEFAULT_VALUES.entry;
  const takeProfit = takeProfitState ?? DEFAULT_VALUES.takeProfit;
  const stopLoss = stopLossState ?? DEFAULT_VALUES.stopLoss;
  const capital = capitalState ?? DEFAULT_VALUES.capital;
  const risk = riskState ?? DEFAULT_VALUES.risk;

  const isValid =
    (stopLoss < entry && entry < takeProfit) ||
    (stopLoss > entry && entry > takeProfit);
  const isShort = entry < stopLoss;

  const riskUnit = Math.abs(entry - stopLoss);

  let positionSize = risk / riskUnit;
  if (discrete) positionSize = Math.floor(positionSize);

  const positionValue = entry * positionSize;
  const requiredLeverage = Math.min(
    maxLeverage ?? DEFAULT_VALUES.maxLeverage,
    Math.max(1, Math.ceil(Math.abs(positionValue / capital)))
  );

  const potentialWin = Math.abs(positionSize * (takeProfit - entry));

  const riskRewardRatio = potentialWin / risk;

  return (
    <div className="flex w-[600px] max-w-full flex-col items-start justify-between gap-7 text-left">
      <h2>Position sizing</h2>

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row flex-wrap gap-2">
            <Input
              type="number"
              label="Capital"
              prefix="$"
              placeholder={DEFAULT_VALUES.capital}
              value={capitalState}
              onChange={setCapital}
              min={0}
              max={100e6}
            />
            <Input
              type="number"
              label="Risk amount"
              prefix="$"
              placeholder={DEFAULT_VALUES.risk}
              value={riskState}
              onChange={setRisk}
              min={0}
              max={capital}
            />
          </div>
          <Checkbox
            label="Use discrete units for position size?"
            checked={discrete}
            onChange={setDiscrete}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row flex-wrap gap-2">
            <Input
              type="number"
              label="Entry price"
              prefix="$"
              placeholder={DEFAULT_VALUES.entry}
              value={entryState}
              onChange={setEntry}
              min={0}
              max={100e6}
            />
            <Input
              type="number"
              label="Stop-loss"
              prefix="$"
              placeholder={DEFAULT_VALUES.stopLoss}
              value={stopLossState}
              onChange={setStopLoss}
              min={0}
              max={100e6}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Input
              type="number"
              label="Take profit"
              prefix="$"
              placeholder={DEFAULT_VALUES.takeProfit}
              value={takeProfitState}
              onChange={setTakeProfit}
              status={`Price change ≈ ${round(Math.abs(((takeProfit - entry) / entry) * 100), 2)}%`}
              min={0}
              max={100e6}
            />
            <Input
              type="number"
              label="Max leverage"
              prefix="X"
              placeholder={DEFAULT_VALUES.maxLeverage}
              value={maxLeverage}
              onChange={setMaxLeverage}
              min={0}
              step={0.1}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto rounded-2xl bg-gradient-to-tl from-gray-100 to-zinc-200 px-6 py-4 text-center dark:bg-gradient-to-tl dark:from-slate-600 dark:to-slate-700">
        {isValid ? (
          <div className="text-xl">
            <div>{`${formatNumber(potentialWin / risk, 1)}R ${riskEmoji(riskRewardRatio)}`}</div>
            <div>
              Potential profit =
              <Strong>
                <PrettyNumber value={potentialWin} prefix="$" />
              </Strong>
            </div>
          </div>
        ) : (
          <div className="text-lg">Check your numbers</div>
        )}
      </div>

      <ActionsSummary
        {...{
          isShort,
          entry,
          positionSize,
          requiredLeverage,
          stopLoss,
          takeProfit,
          trailingStops
        }}
      />

      <div>
        <h3>Trailing stops</h3>

        <p>
          You can lock partial profits when the price changes beyond a given
          amount of risk units.
        </p>

        {trailingStops.length ? (
          <table>
            <thead>
              <tr>
                <th>Trigger</th>
                <th>Lock</th>
              </tr>
            </thead>
            {trailingStops.map(([triggerR, lockR], idx) => (
              <>
                <tr key={idx}>
                  <td className="w-1/2">
                    <Input
                      id={`trailing-stop-trigger-${idx}`}
                      type="number"
                      placeholder="Trigger"
                      suffix="R"
                      value={triggerR}
                      onChange={newTriggerR => {
                        trailingStops[idx] = [
                          newTriggerR!,
                          newTriggerR ? Math.min(newTriggerR, lockR) : lockR
                        ];
                        setTrailingStops([...trailingStops]);
                      }}
                      min={-1}
                      step={0.1}
                      filled
                    />
                  </td>
                  <td className="w-1/2">
                    <Input
                      type="number"
                      placeholder="Lock"
                      suffix="R"
                      value={lockR}
                      onChange={newLockR => {
                        trailingStops[idx] = [
                          newLockR ? Math.max(triggerR, newLockR) : triggerR,
                          newLockR!
                        ];
                        setTrailingStops([...trailingStops]);
                      }}
                      min={-1}
                      max={Math.floor(riskRewardRatio * 10) / 10}
                      step={0.1}
                      filled
                    />
                  </td>
                  <td className="w-[1%]">
                    <div className="flex items-center justify-center">
                      <Button
                        tabIndex={-1}
                        gentle
                        onClick={() =>
                          setTrailingStops(
                            trailingStops.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="text-xs">
                  <td className="content-start pt-0">
                    Trigger =
                    <Strong>
                      <PrettyNumber
                        value={entry + triggerR * (entry - stopLoss)}
                        decimals={10}
                        prefix="$"
                      />
                    </Strong>
                  </td>
                  <td
                    className="flex flex-row flex-wrap gap-x-4 gap-y-0 pt-0"
                    colSpan={2}
                  >
                    <div className="whitespace-nowrap">
                      Limit =
                      <Strong>
                        <PrettyNumber
                          value={entry + lockR * (entry - stopLoss)}
                          decimals={10}
                          prefix="$"
                        />
                      </Strong>
                    </div>
                    <div className="whitespace-nowrap">
                      Change =
                      <Strong>
                        <PrettyNumber
                          value={
                            100 *
                            Math.abs(
                              (entry + lockR * (entry - stopLoss)) / entry - 1
                            )
                          }
                          suffix="%"
                        />
                      </Strong>
                    </div>
                    <div className="whitespace-nowrap">
                      {lockR > 0 ? (
                        <>
                          Min profit =
                          <Strong>
                            <PrettyNumber
                              value={positionSize * (riskUnit * lockR)}
                              prefix="$"
                            />
                          </Strong>
                        </>
                      ) : (
                        <>
                          Max loss =
                          <Strong>
                            <PrettyNumber
                              value={Math.abs(positionSize * riskUnit * lockR)}
                              prefix="$"
                            />
                          </Strong>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </table>
        ) : undefined}

        <Button
          filled
          onClick={() => {
            const triggerR = Math.min(
              Math.floor(riskRewardRatio * 10) / 10,
              Math.max(0, ...trailingStops.map(ts => ts[0])) + 1
            );
            const lockR = Math.min(
              triggerR - 1,
              Math.max(0, ...trailingStops.map(ts => ts[1])) + 1
            );
            setTrailingStops([...trailingStops, [triggerR, lockR]]);
            document
              .getElementById(`trailing-stop-trigger-${trailingStops.length}`)
              ?.focus();
          }}
        >
          Add trailing stop
        </Button>

        <p>
          For example: Lock <Strong>2R</Strong> worth of profit when the price
          goes beyond <Strong>3R</Strong>.<br />
          With the current settings, this would ensure a minimum profit of
          <Strong>
            <PrettyNumber prefix="$" value={2 * risk} />
          </Strong>
          once the price {isShort ? 'falls below' : 'rises above'}
          <Strong>
            <PrettyNumber
              value={entry + riskUnit * 2 * (isShort ? -1 : 1)}
              prefix="$"
            />
          </Strong>
          .
        </p>
        <p>
          Keep in mind that setting <Strong>lock</Strong> to a value close to{' '}
          <Strong>trigger</Strong> increases the chance that small price
          movements might trigger the close.
        </p>
        <p>
          <Strong>Hint:</Strong>
          <br /> Add a trailing stop with <Strong>lock</Strong> set to{' '}
          <Strong>0R</Strong> to reduce risk to
          <Strong>
            <PrettyNumber value={0} prefix="$" />
          </Strong>
          once the price reaches your <Strong>trigger</Strong>.
        </p>
      </div>
    </div>
  );
}
