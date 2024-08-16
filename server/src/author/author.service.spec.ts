import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { Repository } from 'typeorm';
import { Author } from './author.entity/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('AuthorService', () => {
  let service: AuthorService;
  let repositoryMock: MockType<Repository<Author>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    repositoryMock = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });
});
