import { Pairs, Strong } from '@/components/Helpers';
import { PrettyNumber } from '@/components/Num';

export function OrdersSummary({
  isShort,
  entry,
  positionSize,
  requiredLeverage,
  stopLoss,
  takeProfit,
  breakevenLockR
}: {
  isShort: boolean;
  entry: number;
  positionSize: number;
  requiredLeverage: number;
  stopLoss: number;
  takeProfit: number;
  breakevenLockR: number;
}) {
  return (
    <div className="w-full">
      <h3>Orders summary</h3>

      <div className="min-w-full overflow-auto">
        <Pairs
          divide
          data={[
            {
              label: (
                <>
                  Enter <Strong>{isShort ? 'short' : 'long'}</Strong> position
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
                          />
                          X
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
                  Create <Strong>stop-loss</Strong>
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
                  Create <Strong>take profit</Strong>
                </>
              ),
              content: (
                <Strong>
                  <PrettyNumber value={takeProfit} decimals={10} prefix="$" />
                </Strong>
              )
            },

            breakevenLockR
              ? {
                  label: (
                    <>
                      Trailing stop: <Strong>breakeven</Strong>
                    </>
                  ),
                  content: (
                    <Pairs
                      data={[
                        {
                          label: <span>Trigger price</span>,
                          content: (
                            <Strong>
                              <PrettyNumber
                                value={
                                  entry + breakevenLockR * (entry - stopLoss)
                                }
                                decimals={10}
                                prefix="$"
                              />
                            </Strong>
                          )
                        },
                        {
                          label: <span>Limit price</span>,
                          content: (
                            <Strong>
                              <PrettyNumber
                                value={entry}
                                decimals={10}
                                prefix="$"
                              />
                            </Strong>
                          )
                        }
                      ]}
                    />
                  )
                }
              : undefined
          ]}
        />
      </div>
    </div>
  );
}
