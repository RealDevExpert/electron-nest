import { IpcHandle, Window } from '@doubleshot/nest-electron';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { BrowserWindow } from 'electron';

@Controller('demo')
export class DemoController {
  constructor(
    @Window()
    private readonly window: BrowserWindow,
  ) {}

  @IpcHandle('hello')
  async hello(@Payload() payload: string) {
    this.window.webContents.send(`hello:${payload}`);
  }

  @IpcHandle('echo')
  async echo(@Payload() payload: string) {
    return `hello:${payload}`;
  }
}
