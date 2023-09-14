import ws from 'ws';

export type PromiseOr<T> = Promise<T> | T;
export type Callback<Args extends any[] = any[]> = (...args: Args) => PromiseOr<void>;

export default class WsClient {
  private socket?: ws.WebSocket;

  constructor(private address: string, private readonly options: ws.ClientOptions) {}

  onOpen?: Callback<[]>;
  onMessage?: Callback<[any]>;
  onClose?: Callback<[ws.CloseEvent | void]>;

  async connect() {
    if (this.socket && this.socket.readyState === this.socket.OPEN) return;

    const socket = new ws.WebSocket(this.address, this.options);
    this._closing = false;
    socket.onclose = (event) => this.close(event);

    await new Promise((resolve, reject) => {
      socket.onerror = (error) => reject(error);
      socket.onopen = () => resolve(true);
    });
    socket.onmessage = ({ data }) => {
      let message: Record<string, any>;
      try {
        message = JSON.parse(data.toString());
      } catch (error) {
        throw new Error('failed to parse message');
      }

      this.onMessage?.(message);
    };

    this.socket = socket;
    this.onOpen?.();
  }

  private _closing = false;
  close(event?: ws.CloseEvent) {
    if (this._closing) return;
    this._closing = true;
    this.socket?.close();
    this.onClose?.(event);
  }

  async send(data: string) {
    this.throwIfNotOpen();

    await new Promise((resolve, reject) => {
      this.socket!.send(data, (error) => {
        error ? reject(error) : resolve(undefined);
      });
    });
  }

  private throwIfNotOpen() {
    if (!this.socket) {
      throw new Error('Client is not connected');
    }

    const { readyState, OPEN } = this.socket;
    if (readyState === OPEN) return;
    if (readyState < OPEN) {
      throw new Error('socket is still connecting');
    }
    if (readyState > OPEN) {
      throw new Error('socket was closed');
    }
  }
}
