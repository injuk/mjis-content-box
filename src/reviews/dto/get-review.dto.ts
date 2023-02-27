import { IsString } from 'class-validator';
import { ReviewDomainEnum } from '../enums/review-domain.enum';

export class GetReviewDto {
  @IsString()
  readonly domain: ReviewDomainEnum;
}
