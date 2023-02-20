import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

      return transactionCtx.review.create({
        data,
      });
    });
  }

  listReviews() {
    return `This action returns all reviews`;
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
