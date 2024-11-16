import {
  AnyTradeStrategyDefinition,
  Trade,
  TradeDecision,
} from '../trade.type';

export abstract class TradeStrategy {
  abstract decide(
    trade: Trade,
    strategyProps: AnyTradeStrategyDefinition['props'],
  ): TradeDecision[];
}
