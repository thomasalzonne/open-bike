import { Test, TestingModule } from '@nestjs/testing';
import { ParkController } from './park.controller';

describe('ParkController', () => {
  let controller: ParkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkController],
    }).compile();

    controller = module.get<ParkController>(ParkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
