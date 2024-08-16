import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { Repository } from 'typeorm';
import { Content } from './content.entity/content.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('ContentService', () => {
  let service: ContentService;
  let repositoryMock: MockType<Repository<Content>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(Content),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
    repositoryMock = module.get(getRepositoryToken(Content));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });
});
