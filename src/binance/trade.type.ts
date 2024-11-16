export interface TradeStrategyDefinition<S extends TradeStrategyName> {
  name: S;
  props: TradeStrategyProps[S];
}

export type AnyTradeStrategyDefinition =
  TradeStrategyDefinition<TradeStrategyName>;

export interface SimplePriceRateStrategyProps {
  rate: number;
}

export interface SimpleFrequencyStrategyProps {
  frequencyMilliseconds: number;
}

export type TradeStrategyProps = {
  SimplePriceRateStrategy: SimplePriceRateStrategyProps;
  SimpleFrequencyStrategy: SimpleFrequencyStrategyProps;
};

export type TradeStrategyName = keyof TradeStrategyProps;

export enum TradeSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface Trade {
  symbol: string;
  isBuyerMaker: boolean;
}

export interface TradeDecision {
  symbol: string;
  decision: TradeSide;
  quantity: number;
}
