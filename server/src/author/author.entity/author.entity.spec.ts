import { Author } from './author.entity';

describe('AuthorEntity', () => {
  it('should be defined', () => {
    expect(new Author()).toBeDefined();
  });
});
