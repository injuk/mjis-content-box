import { IsOptional, IsString, Matches } from 'class-validator';
import Utility from '../../common/util';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly nickname: string;

  @IsString()
  @IsOptional()
  @Matches(Utility.passwordValidationRule(), {
    message:
      'password must be at least 8 characters and must contain alphabetic, numeric, and special characters without any space',
  })
  readonly password: string;
}
