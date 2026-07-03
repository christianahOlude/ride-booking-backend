import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { RidesModule } from './rides/rides.module';

@Module({
  imports: [DriversModule, RidesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
