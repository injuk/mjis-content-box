import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDomainEnum } from './enums/review-domain.enum';
import { selectReviewClause } from './domain/select-conditions.domain';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: user 도메인이 추가되면 수정 할 것
  createReview(data: CreateReviewDto) {
    const userId = 1;
    const { itemId } = data;

    return this.prisma.$transaction(async (transactionCtx) => {
      const review = await transactionCtx.review.findUnique({
        where: {
          UQ_USER_ITEM: { userId, itemId },
        },
      });
      if (review)
        throw new ConflictException(`user(${userId}), item(${itemId})`);

      // TODO: item이 실제로 존재하는지 확인
      return transactionCtx.review.create({
        data,
      });
    });
  }

  listReviews(domain: ReviewDomainEnum) {
    return this.prisma.$transaction(async (transactionCtx) => {
      const { _count } = await transactionCtx.review.aggregate({
        _count: true,
        where: {
          domain,
        },
      });
      if (_count === 0) return { totalCount: 0, results: [] };

      // TODO: nextToken 방식 도입하기
      const reviews = await transactionCtx.review.findMany({
        take: 50,
        where: {
          domain,
        },
        select: this.createSelectClause(domain),
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { totalCount: _count, results: reviews };
    });
  }

  private createSelectClause(domain: ReviewDomainEnum) {
    const result = { ...selectReviewClause };

    if (domain === ReviewDomainEnum.BOOK) result.book = true;
    if (domain === ReviewDomainEnum.MOVIE) result.movie = true;

    return result;
  }

  // TODO: user 도메인이 추가되면 수정 할 것
  getReviewById(id: number, domain: ReviewDomainEnum) {
    return this.prisma.$transaction(async (transactionCtx) => {
      const review = await transactionCtx.review.findUnique({
        where: {
          id,
        },
        select: this.createSelectClause(domain),
      });

      if (review.domain !== domain)
        throw new NotFoundException(`domain(${domain}), item(${id})`);

      return review;
    });
  }

  updateReview(id: number, dto: UpdateReviewDto) {
    return this.prisma.$transaction(async (transactionCtx) => {
      const review = await transactionCtx.review.findUnique({
        where: {
          id,
        },
      });
      if (!review) throw new NotFoundException(`item(${id})`);

      return transactionCtx.review.update({
        where: { id },
        data: { ...dto },
      });
    });
  }

  deleteReviewById(id: number) {
    return `This action removes a #${id} review`;
  }
}
