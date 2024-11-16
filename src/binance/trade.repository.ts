import { Injectable } from '@nestjs/common';
import { AnyTradeStrategyDefinition } from './trade.type';

@Injectable()
export class TradeRepository {
  async getTradeStrategyDefinition(
    symbol: string,
  ): Promise<AnyTradeStrategyDefinition | null> {
    // todo persistence layer
    // todo cache
    return (
      {
        BTCUSDT: {
          name: 'SimplePriceRateStrategy',
          props: {
            rate: 0.05,
          },
        },
        LTCUSDT: {
          name: 'SimpleFrequencyStrategy',
          props: {
            frequencyMilliseconds: 1000 * 60 * 5, // 5min
          },
        },
      } as const
    )[symbol];
  }
}
