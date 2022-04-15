import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutsController } from './checkouts.controller';

describe('CheckoutsController', () => {
  let controller: CheckoutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutsController],
    }).compile();

    controller = module.get<CheckoutsController>(CheckoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
