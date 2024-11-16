import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BinanceRequest, BinanceResponse } from './binance.type';
import { WsService } from './ws.service';
import { TradeService } from './trade.service';

@Injectable()
export class BinanceService {
  constructor(
    private readonly wsService: WsService,
    private readonly tradeService: TradeService,
  ) {
    // todo clean up and set up through API
    setTimeout(() => this.subscribeAggTrade('btcusdt'), 4000);
    setTimeout(() => this.subscribeAggTrade('LTCUSDT'), 3000);
  }

  @OnEvent('ws.aggTrade')
  async aggTrade(data: Record<string, unknown>) {
    console.log('aggTrade', data);
    // todo persist
    await this.tradeService.processTrade({
      symbol: data['s'] as string,
      isBuyerMaker: data['m'] as boolean,
    });
  }

  @OnEvent('ws.response')
  response(response: BinanceResponse, request: BinanceRequest) {
    console.log('response', response, request);
  }

  subscribeAggTrade(symbol: string) {
    console.log('subscribeAggTrade', symbol);
    this.wsService.sendExpectingResponse({
      method: 'SUBSCRIBE',
      params: [`${symbol}@aggTrade`],
    });
  }
}
