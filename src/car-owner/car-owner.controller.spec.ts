import { Test, TestingModule } from '@nestjs/testing';
import { CarOwnerController } from './car-owner.controller';
import { CarOwnerService } from './car-owner.service';

describe('CarOwnerController', () => {
  let controller: CarOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarOwnerController],
      providers: [CarOwnerService],
    }).compile();

    controller = module.get<CarOwnerController>(CarOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
