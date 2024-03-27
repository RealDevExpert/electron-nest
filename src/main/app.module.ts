import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DemoModule } from './modules/demo/demo.module';
import { electronModule, typeormModule, winstonModule } from './utils/module';

@Module({
  imports: [
    electronModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    typeormModule,
    winstonModule,
    DemoModule,
  ],
  providers: [Logger],
})
export class AppModule {}
