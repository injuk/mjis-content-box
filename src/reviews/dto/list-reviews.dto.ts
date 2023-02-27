import { ReviewDomainEnum } from '../enums/review-domain.enum';
import { IsString, Validate } from 'class-validator';

export class ListReviewsDto {
  @IsString()
  readonly domain: ReviewDomainEnum;
}
