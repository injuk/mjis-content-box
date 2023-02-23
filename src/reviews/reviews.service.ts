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

  createReview(dto: CreateReviewDto) {
    this.logger.debug(`create new review`);

    return this.repository.createReview(dto);
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

  updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    return this.repository.updateReview(id, updateReviewDto);
  }

  deleteReviewById(id: number) {
    return this.repository.deleteReviewById(id);
  }
}
