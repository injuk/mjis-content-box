import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';
import Utility from '../../common/util';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly title: string;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly originalTitle: string;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly author: string;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly publisher: string;

  @IsDateString()
  @IsOptional()
  readonly publishedAt: string;

  @IsString()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly genre: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @Transform(Utility.trimWhenStringValue)
  readonly coverUrl: string;
}
