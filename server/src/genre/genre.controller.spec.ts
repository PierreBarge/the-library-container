import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { GenreService } from './genre.service';

const moduleMocker = new ModuleMocker(global);

describe('GenreController', () => {
  let controller: GenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === GenreService) {
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

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
