import { Book } from '../../book/book.entity/book.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  text: string;
  @OneToOne(() => Book, (book) => book.content)
  book: Book;
}
