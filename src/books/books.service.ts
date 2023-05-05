import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(private readonly repository: BooksRepository) {}

  createBook(user, dto: CreateBookDto) {
    this.logger.debug(`create new book`);

    const data = {
      title: dto.title,
      originalTitle: dto.originalTitle,
      author: dto.author,
      publisher: dto.publisher,
      publishedAt: dto.publishedAt,
      isbn: dto.isbn,
      genre: dto.genre,
      coverUrl: dto.coverUrl,

      // TODO: users API가 도입되면 수정할 것
      createdBy: user.id,
      updatedBy: user.id,
    };

    return this.repository.createBook(data);
  }

  listBooks() {
    this.logger.debug(`list books`);

    return this.repository.listBooks();
  }

  // TODO: 반환 형태 정의하기
  async getBookById(id: number) {
    this.logger.debug(`get book by id`);

    const result = await this.repository.getBookById(id);
    if (!result) throw new NotFoundException(`book_id(${id})`);

    return result;
  }

  updateBook(user, id: number, dto: UpdateBookDto) {
    this.logger.debug(`update book`);

    return this.repository.updateBook(user.id, id, dto);
  }

  deleteBookById(user, id: number) {
    this.logger.debug(`delete book`);

    return this.repository.deleteBookById(user.id, id);
  }
}
