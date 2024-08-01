import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity/book.entity';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}

  @Get()
  getAll() {
    return this.service.getAllBooks();
  }

  @Get('/detailed')
  getDetailed() {
    return this.service.getDetailedBooks();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getBookById(id);
  }

  @Post()
  create(@Body() book: Book) {
    return this.service.addBook(book);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() book: Book) {
    return this.service.modifyBookById(id, book.title);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.service.deleteBook(id);
    console.log(`Book with id ${id} successfully deleted!!`);
    return;
  }
}
