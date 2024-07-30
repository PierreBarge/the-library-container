import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './content.entity/content.entity';

@Controller('content')
export class ContentController {
  constructor(private service: ContentService) {}

  @Get()
  getAll() {
    return this.service.getAllContents();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getContentById(id);
  }

  @Post()
  create(@Body() content: Content) {
    return this.service.addContent(content);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() content: Content) {
    return this.service.modifyContentById(id, content.text);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.service.deleteContent(id);
    console.log(`Content with id ${id} successfully deleted!!`);
    return;
  }
}
