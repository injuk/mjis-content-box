import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createReview(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
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
