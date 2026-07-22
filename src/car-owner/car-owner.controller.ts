import { Controller, Post, Body, Param, Patch, Get, ParseUUIDPipe } from '@nestjs/common';
import { CarOwnerService } from './car-owner.service';
import { CreateCarOwnerDto } from './dto/create-car-owner.dto';
import { CreateVehicleDto } from '../vehicle/dto/create-vehicle.dto';

@Controller('car-owner')
export class CarOwnerController {
  constructor(private readonly carOwnerService: CarOwnerService) { }

  @Post('register')
  register(@Body() createCarOwnerDto: CreateCarOwnerDto) {
    return this.carOwnerService.create(createCarOwnerDto);
  }

  @Post(':id/vehicles')
  addVehicle(
    @Param('id', ParseUUIDPipe) ownerId: string,
    @Body() addVehicleDto: CreateVehicleDto,
  ) {
    return this.carOwnerService.addVehicle(ownerId, addVehicleDto);
  }

  @Patch('vehicles/:vehicleId/availability')
  toggleAvailability(
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body('isAvailable') isAvailable: boolean,
  ) {
    return this.carOwnerService.toggleAvailability(vehicleId, isAvailable);
  }

  @Get(':id/dashboard')
  getDashboard(@Param('id', ParseUUIDPipe) ownerId: string) {
    return this.carOwnerService.getDashboard(ownerId);
  }
}