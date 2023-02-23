import { IsString, Validate } from 'class-validator';
import { ValidDomain } from '../validators/domain.validator';
import { Transform } from 'class-transformer';
import Utility from '../../common/util';
import { ReviewDomainEnum } from '../enums/review-domain.enum';

export class GetReviewDto {
  @IsString()
  @Validate(ValidDomain, {
    message: `invalid domain`,
  })
  @Transform(Utility.toUpperCase)
  readonly domain: ReviewDomainEnum;
}
