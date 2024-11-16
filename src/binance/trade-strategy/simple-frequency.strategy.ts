import {
  Trade,
  TradeDecision,
  TradeSide,
  TradeStrategyDefinition,
} from '../trade.type';
import { TradeStrategy } from './trade.strategy';

export class SimpleFrequencyStrategy extends TradeStrategy {
  decide(
    trade: Trade,
    strategyProps: TradeStrategyDefinition<'SimpleFrequencyStrategy'>['props'],
  ): TradeDecision[] {
    return [
      {
        symbol: trade.symbol,
        decision: TradeSide.BUY,
        quantity: 1,
      },
    ];
  }
}
