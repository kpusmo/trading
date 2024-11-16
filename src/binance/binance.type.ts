export type BinanceRequest = Record<string, unknown>;

export interface BinanceResponse {
  result: unknown;
  id: string;
}

export interface BinanceEvent extends Record<string, unknown> {
  e: string; // event name
}

export type BinanceMessage = BinanceResponse | BinanceEvent;
