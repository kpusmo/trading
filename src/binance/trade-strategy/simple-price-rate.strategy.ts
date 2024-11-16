import {
  Trade,
  TradeDecision,
  TradeSide,
  TradeStrategyDefinition,
} from '../trade.type';
import { TradeStrategy } from './trade.strategy';

export class SimplePriceRateStrategy extends TradeStrategy {
  decide(
    trade: Trade,
    strategyProps: TradeStrategyDefinition<'SimplePriceRateStrategy'>['props'],
  ): TradeDecision[] {
    return [
      {
        symbol: trade.symbol,
        decision: TradeSide.SELL,
        quantity: 2,
      },
    ];
  }
}
