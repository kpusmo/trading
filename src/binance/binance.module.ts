import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WsService } from './ws.service';
import { BinanceService } from './binance.service';
import { TradeService } from './trade.service';
import { TradeRepository } from './trade.repository';
import { TradeStrategyFactory } from './trade-strategy/trade-strategy.factory';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    WsService,
    BinanceService,
    TradeService,
    TradeRepository,
    TradeStrategyFactory,
  ],
})
export class BinanceModule {}
