import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createDriverDto: CreateDriverDto) {
    const { email, phoneNumber, fullName, companyName, idCardUrl } = createDriverDto;

    const existingDriver = await this.prisma.driver.findFirst({
      where: { OR: [{ email }, { phoneNumber }] },
    });
    if (existingDriver) {
      throw new ConflictException('Driver with this email or phone number already exists');
    }

    return this.prisma.$transaction(async (tx) => {
      const driver = await tx.driver.create({
        data: {
          fullName,
          email,
          phoneNumber,
          companyName,
          idCardUrl
        },
      });

      await tx.wallet.create({
        data: { driverId: driver.id },
      });

      return driver;
    });
  }

  async findOne(id: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: {
        wallet: {
          select: { balance: true, updatedAt: true },
        },
      },
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }
}