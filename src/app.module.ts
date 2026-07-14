import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { RidesModule } from './rides/rides.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DriversModule, RidesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
