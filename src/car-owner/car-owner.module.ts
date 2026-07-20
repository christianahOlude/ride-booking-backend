import { Module } from '@nestjs/common';
import { CarOwnerService } from './car-owner.service';
import { CarOwnerController } from './car-owner.controller';

@Module({
  controllers: [CarOwnerController],
  providers: [CarOwnerService],
})
export class CarOwnerModule {}
