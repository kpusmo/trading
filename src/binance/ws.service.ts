import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { setTimeout } from 'node:timers/promises';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  BinanceEvent,
  BinanceMessage,
  BinanceRequest,
  BinanceResponse,
} from './binance.type';
import { v4 as uuidv4 } from 'uuid';

/*
  This could be rewritten into a generic, reusable WS module,
  but I keep it like this for simplicity.
  I did not use https://github.com/blockcoders/nestjs-websocket
  because it seems abandoned and does not handle reconnects.
*/
@Injectable()
export class WsService {
  private ws: WebSocket;
  private requestStore = new Map<string, BinanceRequest>();

  constructor(private readonly eventEmitter: EventEmitter2) {
    this.establishWebsocket();
  }

  sendExpectingResponse(_data: Record<string, unknown>) {
    const id = (_data.id as string) ?? uuidv4();
    const data = { ..._data, id };
    // todo timeout requests and clean up requestStore to avoid memory leak
    this.requestStore.set(id, data);
    console.log('send', id, data);
    this.ws.send(JSON.stringify(data));
  }

  private establishWebsocket() {
    // todo url from config
    this.ws = new WebSocket('wss://stream.testnet.binance.vision/ws', {
      headers: {
        'X-MBX-APIKEY': process.env['BINANCE_API_KEY'], // todo config service
      },
    });
    this.ws.on('error', console.error);

    this.ws.on('open', () => {
      console.log('Client connected');
    });

    this.ws.on('message', (message: Buffer) => {
      const payload = this.parseMessagePayload(message);
      if (this.isBinanceEvent(payload)) {
        this.eventEmitter.emit(`ws.${payload['e']}`, payload);
      } else if (this.isBinanceResponse(payload)) {
        const request = this.requestStore.get(payload.id);
        this.requestStore.delete(payload.id);
        this.eventEmitter.emit(`ws.response`, payload, request);
      } else {
        console.warn('unhandled message format', payload);
      }
    });

    this.ws.on('close', async (_code) => {
      // todo should reconnect on all codes?
      // todo reconnect timeout from config; backoff?
      // todo take into account binance rate limiting
      console.log('connection closed; reconnecting after 3000ms');
      await setTimeout(3000);
      this.establishWebsocket();
    });
  }

  private parseMessagePayload(message: Buffer): BinanceMessage {
    try {
      const payload = JSON.parse(message.toString());
      return payload;
    } catch (error) {
      console.error('error while parsing message from the server');
      throw error;
    }
  }

  private isBinanceEvent(payload: BinanceMessage): payload is BinanceEvent {
    return !!payload['e'];
  }

  private isBinanceResponse(
    payload: BinanceMessage,
  ): payload is BinanceResponse {
    return payload['id'] !== undefined && payload['result'] !== undefined;
  }
}
