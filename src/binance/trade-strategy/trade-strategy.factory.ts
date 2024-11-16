import { Injectable } from '@nestjs/common';
import { AnyTradeStrategyDefinition, TradeStrategyName } from '../trade.type';
import { TradeStrategy } from './trade.strategy';
import { SimplePriceRateStrategy } from './simple-price-rate.strategy';
import { SimpleFrequencyStrategy } from './simple-frequency.strategy';

@Injectable()
export class TradeStrategyFactory {
  private readonly strategyMap: Record<
    TradeStrategyName,
    new () => TradeStrategy
  > = {
    SimplePriceRateStrategy: SimplePriceRateStrategy,
    SimpleFrequencyStrategy: SimpleFrequencyStrategy,
  };

  getStrategy(strategyDefinition: AnyTradeStrategyDefinition): TradeStrategy {
    return new this.strategyMap[strategyDefinition.name]();
  }
}
