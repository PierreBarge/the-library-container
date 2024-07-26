import { Injectable } from '@nestjs/common';
import { Author } from './author.entity/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async getAuthorById(id: number): Promise<Author[]> {
    return await this.authorRepository.find({
      select: ['id', 'firstname', 'lastname', 'birthdate'],
      where: [{ id: id }],
    });
  }

  addAuthor(author: Author): Promise<Author> {
    return this.authorRepository.save(author);
  }

  async modifyAuthorFirstnameById(id: number, firstname: string) {
    await this.authorRepository
      .createQueryBuilder()
      .update(Author)
      .set({ firstname: firstname })
      .where('id = :id', { id: id })
      .execute();
    return await this.authorRepository.find({
      select: ['id', 'firstname', 'lastname', 'birthdate'],
      where: [{ id: id }],
    });
  }

  deleteAuthor(id: number): void {
    this.authorRepository.delete(id);
  }
}
