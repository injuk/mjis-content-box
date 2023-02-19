import { Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(private readonly repository: ReviewsRepository) {}

  createReview(createReviewDto: CreateReviewDto) {
    return this.repository.createReview(createReviewDto);
  }

  listReviews() {
    return this.repository.listReviews();
  }

  getReviewById(id: number) {
    return this.repository.getReviewById(id);
  }

  updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    return this.repository.updateReview(id, updateReviewDto);
  }

  deleteReviewById(id: number) {
    return this.repository.deleteReviewById(id);
  }
}
