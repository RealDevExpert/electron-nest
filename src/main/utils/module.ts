import { ElectronModule } from '@doubleshot/nest-electron';
import type { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrowserWindow, app } from 'electron';
import { WinstonModule, utilities } from 'nest-winston';
import { release } from 'node:os';
import { join } from 'node:path';
import winston from 'winston';
import { isWin } from '.';

const HEIGHT = 900;
const WIDTH = 1600;

export const electronModule: DynamicModule = ElectronModule.registerAsync({
  useFactory: async () => {
    const isDev = !app.isPackaged;

    if (release().startsWith('6.1')) app.disableHardwareAcceleration();
    if (isWin()) app.setAppUserModelId(app.getName());
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      process.exit(0);
    }

    const win = new BrowserWindow({
      width: WIDTH,
      height: HEIGHT,
      minWidth: WIDTH,
      minHeight: HEIGHT,
      autoHideMenuBar: true,
      titleBarStyle: isWin() ? 'default' : 'hidden',
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
      },
    });

    win.on('closed', () => {
      win.destroy();
    });

    const URL = isDev ? process.env.DS_RENDERER_URL : `file://${join(app.getAppPath(), 'dist/render/index.html')}`;

    win.loadURL(URL);

    return { win };
  },
  isGlobal: true,
});

const dbLocation = join(app.getPath('userData'), 'temp-ratio.sqlite3');

export const typeormModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'sqljs',
  autoSave: true,
  location: dbLocation,
  autoLoadEntities: true,
  synchronize: true,
});

export const winstonModule: DynamicModule = WinstonModule.forRoot({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('TempRatio', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
});
