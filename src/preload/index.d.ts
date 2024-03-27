declare global {
  interface Window {
    electron: {
      onHello(cb: (arg: string) => any): void;
      echo(arg: string): Promise<string>;
    };
  }

  interface GenericResult<T> {
    code: number;
    msg: string;
    data?: T;
  }
}

export { };

