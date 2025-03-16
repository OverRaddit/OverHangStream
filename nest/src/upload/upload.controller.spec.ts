import { Test, TestingModule } from '@nestjs/testing';
import { UploadControllerController } from './upload.controller';

describe('UploadControllerController', () => {
  let controller: UploadControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadControllerController],
    }).compile();

    controller = module.get<UploadControllerController>(
      UploadControllerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
