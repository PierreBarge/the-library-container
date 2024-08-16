import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from './book.entity/book.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
}));

describe('BookService', () => {
  let service: BookService;
  let repositoryMock: MockType<Repository<Book>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repositoryMock = module.get(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should get all books', async () => {
    const books = [
      { id: 1, title: 'Hamlet' },
      { id: 2, title: 'Germinal' },
      { id: 3, title: 'La Curée' },
      { id: 4, title: 'Notre-Dame de Paris' },
      { id: 5, title: 'Les Misérables' },
    ];
    repositoryMock.find.mockReturnValue(books);
    expect(await service.getAllBooks()).toEqual(books);
    expect(repositoryMock.find).toHaveBeenCalledWith();
  });

  it('should get a book by id', async () => {
    const book = { id: 1, title: 'Hamlet' };
    repositoryMock.find.mockReturnValue(book);
    expect(await service.getBookById(book.id)).toEqual(book);
    expect(repositoryMock.find).toHaveBeenCalledWith({
      select: ['id', 'title'],
      where: [{ id: book.id }],
    });
  });
});
