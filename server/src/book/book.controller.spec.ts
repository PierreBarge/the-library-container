import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === BookService) {
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

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
