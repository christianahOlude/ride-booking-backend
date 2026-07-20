import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarOwnerService } from './car-owner.service';
import { CreateCarOwnerDto } from './dto/create-car-owner.dto';
import { UpdateCarOwnerDto } from './dto/update-car-owner.dto';

@Controller('car-owner')
export class CarOwnerController {
  constructor(private readonly carOwnerService: CarOwnerService) {}

  @Post()
  create(@Body() createCarOwnerDto: CreateCarOwnerDto) {
    return this.carOwnerService.create(createCarOwnerDto);
  }

  @Get()
  findAll() {
    return this.carOwnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carOwnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarOwnerDto: UpdateCarOwnerDto) {
    return this.carOwnerService.update(+id, updateCarOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carOwnerService.remove(+id);
  }
}
