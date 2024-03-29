import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsRepository } from './reviews.repository';
import { ListReviewsDto } from './dto/list-reviews.dto';
import { GetReviewDto } from './dto/get-review.dto';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(private readonly repository: ReviewsRepository) {}

  createReview(user, dto: CreateReviewDto) {
    this.logger.debug(`create new review`);

    return this.repository.createReview(user, dto);
  }

  listReviews(dto: ListReviewsDto) {
    const { domain } = dto;
    this.logger.debug(`list reviews with domain ${domain}`);

    return this.repository.listReviews(domain);
  }

  async getReviewById(id: number, dto: GetReviewDto) {
    const { domain } = dto;
    this.logger.debug(`get review by id with domain ${domain}`);

    const result = await this.repository.getReviewById(id, domain);
    if (!result) throw new NotFoundException(`review_id(${id})`);

    return result;
  }

  updateReview(user, id: number, dto: UpdateReviewDto) {
    this.logger.debug(`update review by id`);

    return this.repository.updateReview(user.id, id, dto);
  }

  deleteReviewById(user, id: number) {
    return this.repository.deleteReviewById(user.id, id);
  }
}
