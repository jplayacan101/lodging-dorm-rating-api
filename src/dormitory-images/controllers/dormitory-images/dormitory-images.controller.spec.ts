import { Test, TestingModule } from '@nestjs/testing';
import { DormitoryImagesController } from './dormitory-images.controller';

describe('DormitoryImagesController', () => {
  let controller: DormitoryImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DormitoryImagesController],
    }).compile();

    controller = module.get<DormitoryImagesController>(DormitoryImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
