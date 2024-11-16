import { Injectable } from '@nestjs/common';
import { TradeRepository } from './trade.repository';
import { Trade, TradeDecision } from './trade.type';
import { TradeStrategyFactory } from './trade-strategy/trade-strategy.factory';

@Injectable()
export class TradeService {
  constructor(
    private readonly tradeRepository: TradeRepository,
    private readonly tradeStrategyFactory: TradeStrategyFactory,
  ) {}

  async processTrade(trade: Trade): Promise<void> {
    const strategyDefinition =
      await this.tradeRepository.getTradeStrategyDefinition(trade.symbol);
    if (!strategyDefinition) {
      // todo error handling
      throw new Error(`No strategy found for symbol ${trade.symbol}`);
    }
    const strategy = this.tradeStrategyFactory.getStrategy(strategyDefinition);
    const decisions = strategy.decide(trade, strategyDefinition.props);
    await this.applyDecision(decisions);
  }

  async applyDecision(decisions: TradeDecision[]): Promise<void> {
    for (const decision of decisions) {
      console.log(decision);
    }
  }
}
