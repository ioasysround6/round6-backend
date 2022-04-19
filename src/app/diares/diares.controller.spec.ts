import { Test, TestingModule } from '@nestjs/testing';
import { DiaresController } from './diares.controller';

describe('DiaresController', () => {
  let controller: DiaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaresController],
    }).compile();

    controller = module.get<DiaresController>(DiaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
