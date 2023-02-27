import { IsBoolean, IsOptional, IsString, Validate } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  readonly rating: number;

  @IsString()
  @IsOptional()
  readonly content: string;

  @IsBoolean()
  @IsOptional()
  readonly hasSpoiler: boolean;
}
