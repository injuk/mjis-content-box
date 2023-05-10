import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  selectBookClause,
  selectBookWithReviewClause,
} from './domain/select-conditions.domain';

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  createBook(data) {
    const { author, isbn } = data;

    return this.prisma.$transaction(async (transactionCtx) => {
      const user = await transactionCtx.user.findUnique({
        where: {
          id: data.createdBy,
        },
      });
      if (!user) throw new BadRequestException(`invalid userId`);

      const book = await transactionCtx.book.findUnique({
        where: {
          UQ_AUTHOR_ISBN: { author, isbn },
        },
      });
      if (book) throw new ConflictException(`author(${author}), isbn(${isbn})`);

      return transactionCtx.book.create({
        data,
      });
    });
  }

  listBooks() {
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

  getBookById(id: number, hasReviews: boolean) {
    return this.prisma.book.findUnique({
      where: { id },
      select: this.createSelectClause(hasReviews),
    });
  }

  private createSelectClause(hasReviews: boolean) {
    return hasReviews ? selectBookWithReviewClause : selectBookClause;
  }

  updateBook(userId: number, id: number, dto: UpdateBookDto) {
    return this.prisma.$transaction(async (transactionCtx) => {
      const user = await transactionCtx.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new BadRequestException(`invalid userId`);

      const book = await transactionCtx.book.findUnique({
        where: { id },
      });
      if (!book) throw new NotFoundException(`book_id(${id})`);

      return transactionCtx.book.update({
        where: { id },
        data: { ...dto, updatedBy: userId },
      });
    });
  }

  deleteBookById(userId: number, id: number) {
    return this.prisma.$transaction(async (transactionCtx) => {
      const user = await transactionCtx.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new BadRequestException(`invalid userId`);

      const book = await transactionCtx.book.findUnique({
        where: { id },
      });
      if (!book) throw new NotFoundException(`book_id(${id})`);

      return transactionCtx.book.delete({
        where: { id },
      });
    });
  }
}
