import { Test, TestingModule } from '@nestjs/testing';
import { DiaresService } from './diares.service';

describe('DiaresService', () => {
  let service: DiaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiaresService],
    }).compile();

    service = module.get<DiaresService>(DiaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
