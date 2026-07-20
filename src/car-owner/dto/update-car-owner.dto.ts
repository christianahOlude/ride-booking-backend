import { PartialType } from '@nestjs/mapped-types';
import { CreateCarOwnerDto } from './create-car-owner.dto';

export class UpdateCarOwnerDto extends PartialType(CreateCarOwnerDto) {}
