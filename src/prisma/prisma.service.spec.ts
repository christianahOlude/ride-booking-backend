import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    end: jest.fn(),
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
