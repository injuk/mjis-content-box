import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ReviewDomainEnum } from '../enums/review-domain.enum';

export class CreateReviewDto {
  @IsInt()
  @IsPositive()
  readonly itemId: number;

  @IsString()
  readonly domain: ReviewDomainEnum;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsString()
  @IsOptional()
  readonly content: string;

  @IsBoolean()
  readonly hasSpoiler: boolean;
}
