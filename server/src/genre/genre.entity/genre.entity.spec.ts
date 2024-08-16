import { Genre } from './genre.entity';

describe('GenreEntity', () => {
  it('should be defined', () => {
    expect(new Genre()).toBeDefined();
  });
});
