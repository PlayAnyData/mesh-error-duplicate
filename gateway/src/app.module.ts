import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { configModuleOptions } from './configurationSchema';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
