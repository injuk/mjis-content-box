import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDomainEnum } from './enums/review-domain.enum';
import { ListReviewsDto } from './dto/list-reviews.dto';
import { selectReviewClause } from './domain/select-conditions.domain';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createReview(data: CreateReviewDto) {
    // TODO: user 도메인이 추가되면 수정 할 것
    const userId = 1;
    const { itemId } = data;

    return this.prisma.$transaction(async (transactionCtx) => {
      const review = await transactionCtx.review.findUnique({
        where: {
          userId_itemId: { userId, itemId },
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

  listReviews(data: ListReviewsDto) {
    const { domain } = data;
    return this.prisma.$transaction(async (transactionCtx) => {
      const { _count } = await transactionCtx.review.aggregate({
        _count: true,
        where: {
          domain,
        },
      });
      if (_count === 0) return { totalCount: 0, results: [] };

      if (domain === ReviewDomainEnum.BOOK) selectReviewClause.book = true;
      if (domain === ReviewDomainEnum.MOVIE) selectReviewClause.movie = true;

      // TODO: nextToken 방식 도입하기
      const reviews = await transactionCtx.review.findMany({
        take: 50,
        where: {
          domain,
        },
        select: selectReviewClause,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { totalCount: _count, results: reviews };
    });
  }

  getReviewById(id: number) {
    return `This action returns a #${id} review`;
  }

  updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  deleteReviewById(id: number) {
    return `This action removes a #${id} review`;
  }
}
