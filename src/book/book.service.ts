import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book[]> {
    return await this.bookRepository.find({
      select: ['id', 'title'],
      where: [{ id: id }],
    });
  }

  addBook(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async modifyBookById(id: number, title: string) {
    await this.bookRepository
      .createQueryBuilder()
      .update(Book)
      .set({ title: title })
      .where('id = :id', { id: id })
      .execute();
    return await this.bookRepository.find({
      select: ['id', 'title'],
      where: [{ id: id }],
    });
  }

  deleteBook(id: number): void {
    this.bookRepository.delete(id);
  }
}
