import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarOwnerDto } from './dto/create-car-owner.dto';
import { CreateVehicleDto } from '../vehicle/dto/create-vehicle.dto';

@Injectable()
export class CarOwnerService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCarOwnerDto: CreateCarOwnerDto) {
    const { email, phoneNumber, fullName } = createCarOwnerDto;

    const existingOwner = await this.prisma.carOwner.findFirst({
      where: { OR: [{ email }, { phoneNumber }] },
    });
    if (existingOwner) {
      throw new ConflictException('Car Owner with this email or phone number already exists');
    }

    return this.prisma.$transaction(async (tx) => {
      const owner = await tx.carOwner.create({
        data: { fullName, email, phoneNumber },
      });

      await tx.ownerWallet.create({
        data: { ownerId: owner.id },
      });

      return owner;
    });
  }

  async addVehicle(ownerId: string, createVehicleDto: CreateVehicleDto) {
    const owner = await this.prisma.carOwner.findUnique({ where: { id: ownerId } });
    if (!owner) throw new NotFoundException('Car Owner not found');

    const existingCar = await this.prisma.vehicle.findUnique({
      where: { plateNumber: createVehicleDto.plateNumber },
    });
    if (existingCar) throw new ConflictException('Vehicle with this plate number already registered');

    return this.prisma.vehicle.create({
      data: {
        ...createVehicleDto,
        ownerId,
      },
    });
  }

  async toggleAvailability(vehicleId: string, isAvailable: boolean) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return this.prisma.vehicle.update({
      where: { id: vehicleId },
      data: { isAvailable },
    });
  }


  async getDashboard(ownerId: string) {
    const owner = await this.prisma.carOwner.findUnique({
      where: { id: ownerId },
      include: {
        vehicles: true,
        wallet: {
          select: { balance: true, updatedAt: true },
        },
      },
    });
    if (!owner) throw new NotFoundException('Car Owner not found');
    return owner;
  }
}