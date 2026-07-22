import { Module } from '@nestjs/common';
import { CarOwnerService } from './car-owner.service';
import { CarOwnerController } from './car-owner.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CarOwnerController],
  providers: [CarOwnerService],
})
export class CarOwnerModule { }
