import {
  Logger,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(private readonly prisma: PrismaService) {}

  createBook(dto: CreateBookDto) {
    this.logger.debug(`create new book`);
    const { author, isbn } = dto;

    return this.prisma.$transaction(async (transactionCtx) => {
      const book = await transactionCtx.book.findUnique({
        where: {
          UQ_AUTHOR_ISBN: { author, isbn },
        },
      });

      if (book) throw new ConflictException(`author(${author}), isbn(${isbn})`);

      return transactionCtx.book.create({
        data: {
          title: dto.title,
          originalTitle: dto.originalTitle,
          author: dto.author,
          publisher: dto.publisher,
          publishedAt: dto.publishedAt,
          isbn: dto.isbn,
          genre: dto.genre,
          coverUrl: dto.coverUrl,

          // TODO: users API가 도입되면 수정할 것
          createdBy: 1,
          updatedBy: 1,
        },
      });
    });
  }

  listBooks() {
    this.logger.debug(`list books`);

    return this.prisma.$transaction(async (transactionCtx) => {
      const { _count } = await transactionCtx.book.aggregate({
        _count: true,
      });

      if (_count === 0) return { totalCount: 0, results: [] };

      // TODO: nextToken 방식 도입하기
      const books = await transactionCtx.book.findMany({
        take: 50,
      });

      return { totalCount: _count, results: books };
    });
  }

  async getBookById(id: number) {
    this.logger.debug(`get book by id`);

    const result = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!result) throw new NotFoundException(`book_id(${id})`);

    return result;
  }
}
