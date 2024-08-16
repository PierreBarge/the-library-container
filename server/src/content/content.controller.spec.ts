import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ContentService } from './content.service';

const moduleMocker = new ModuleMocker(global);

describe('ContentController', () => {
  let controller: ContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === ContentService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<ContentController>(ContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
