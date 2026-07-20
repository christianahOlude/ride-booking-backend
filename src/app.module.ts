import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { RidesModule } from './rides/rides.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CarOwnerModule } from './car-owner/car-owner.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [DriversModule, RidesModule, PrismaModule, UsersModule, CarOwnerModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
