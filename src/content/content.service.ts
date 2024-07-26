import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async getAllContents(): Promise<Content[]> {
    return await this.contentRepository.find();
  }

  async getContentById(id: number): Promise<Content[]> {
    return await this.contentRepository.find({
      select: ['id', 'text'],
      where: [{ id: id }],
    });
  }

  addContent(content: Content): Promise<Content> {
    return this.contentRepository.save(content);
  }

  async modifyContentById(id: number, text: string) {
    await this.contentRepository
      .createQueryBuilder()
      .update(Content)
      .set({ text: text })
      .where('id = :id', { id: id })
      .execute();
    return await this.contentRepository.find({
      select: ['id', 'text'],
      where: [{ id: id }],
    });
  }

  deleteContent(id: number): void {
    this.contentRepository.delete(id);
  }
}
