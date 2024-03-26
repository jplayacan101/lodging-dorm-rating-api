import { Test, TestingModule } from '@nestjs/testing';
import { DormitoryImagesService } from './dormitory-images.service';

describe('DormitoryImagesService', () => {
  let service: DormitoryImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DormitoryImagesService],
    }).compile();

    service = module.get<DormitoryImagesService>(DormitoryImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
