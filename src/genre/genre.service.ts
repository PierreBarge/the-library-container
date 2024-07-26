import { Injectable } from '@nestjs/common';
import { Genre } from './genre.entity/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async getAllGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async getGenreById(id: number): Promise<Genre[]> {
    return await this.genreRepository.find({
      select: ['id', 'name'],
      where: [{ id: id }],
    });
  }

  addGenre(genre: Genre): Promise<Genre> {
    return this.genreRepository.save(genre);
  }

  async modifyGenreById(id: number, name: string) {
    await this.genreRepository
      .createQueryBuilder()
      .update(Genre)
      .set({ name: name })
      .where('id = :id', { id: id })
      .execute();
    return await this.genreRepository.find({
      select: ['id', 'name'],
      where: [{ id: id }],
    });
  }

  deleteGenre(id: number): void {
    this.genreRepository.delete(id);
  }
}
