import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private service: AuthorService) {}

  @Get()
  getAll() {
    return this.service.getAllAuthors();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getAuthorById(id);
  }

  @Post()
  create(@Body() author: Author) {
    return this.service.addAuthor(author);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() author: Author) {
    return this.service.modifyAuthorFirstnameById(id, author.firstname);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.service.deleteAuthor(id);
    console.log(`Author with id ${id} successfully deleted!!`);
    return;
  }
}
