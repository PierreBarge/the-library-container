import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity/genre.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('GenreService', () => {
  let service: GenreService;
  let repositoryMock: MockType<Repository<Genre>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(Genre),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<GenreService>(GenreService);
    repositoryMock = module.get(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });
});
