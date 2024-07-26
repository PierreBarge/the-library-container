import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity/genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private service: GenreService) {}

  @Get()
  getAll() {
    return this.service.getAllGenres();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getGenreById(id);
  }

  @Post()
  create(@Body() genre: Genre) {
    return this.service.addGenre(genre);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() genre: Genre) {
    return this.service.modifyGenreById(id, genre.name);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.service.deleteGenre(id);
    console.log(`Genre with id ${id} successfully deleted!!`);
    return;
  }
}
