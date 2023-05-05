import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
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
