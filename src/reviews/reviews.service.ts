import { Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsRepository } from './reviews.repository';
import { ReviewDomainEnum } from './enums/review-domain.enum';
import { ListReviewsDto } from './dto/list-reviews.dto';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(private readonly repository: ReviewsRepository) {}

  createReview(dto: CreateReviewDto) {
    this.logger.debug(`create new review`);

    return this.repository.createReview(dto);
  }

  listReviews(dto: ListReviewsDto) {
    this.logger.debug(`list reviews`);

    return this.repository.listReviews(dto);
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
