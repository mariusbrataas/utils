import { Pairs, Strong } from '@/components/Helpers';
import { PrettyNumber } from '@/components/Num';

export function ActionsSummary({
  isShort,
  entry,
  positionSize,
  requiredLeverage,
  stopLoss,
  takeProfit
}: {
  isShort: boolean;
  entry: number;
  positionSize: number;
  requiredLeverage: number;
  stopLoss: number;
  takeProfit: number;
}) {
  return (
    <div className="w-full">
      <h3>Orders summary</h3>

      <div className="min-w-full overflow-auto" tabIndex={-1}>
        <Pairs
          divide
          data={[
            {
              label: (
                <>
                  <Strong>{isShort ? 'Short' : 'Long'}</Strong> position
                </>
              ),
              content: (
                <Pairs
                  data={[
                    {
                      label: 'Price',
                      content: (
                        <Strong>
                          <PrettyNumber
                            value={entry}
                            decimals={10}
                            prefix="$"
                          />
                        </Strong>
                      )
                    },
                    {
                      label: 'Size',
                      content: (
                        <Strong>
                          <PrettyNumber value={positionSize} decimals={10} />
                        </Strong>
                      )
                    },
                    {
                      label: 'Leverage',
                      content: (
                        <Strong>
                          <PrettyNumber
                            value={requiredLeverage}
                            decimals={10}
                            suffix="X"
                          />
                        </Strong>
                      )
                    }
                  ]}
                />
              )
            },

            {
              label: (
                <>
                  <Strong>Stop-loss</Strong>
                </>
              ),
              content: (
                <Strong>
                  <PrettyNumber value={stopLoss} decimals={10} prefix="$" />
                </Strong>
              )
            },

            {
              label: (
                <>
                  <Strong>Take profit</Strong>
                </>
              ),
              content: (
                <Strong>
                  <PrettyNumber value={takeProfit} decimals={10} prefix="$" />
                </Strong>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}
