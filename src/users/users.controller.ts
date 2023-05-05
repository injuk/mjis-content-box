import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import commonConfig from '../config/common.config';
import { ConfigType } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: CreateUserDto) {
    return this.usersService.signUp(dto);
  }

  @Post('/sign-in')
  @UsePipes(new ValidationPipe())
  signIn(@Body() dto: SignInDto) {
    return this.usersService.signIn();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch('/me')
  @UsePipes(new ValidationPipe())
  updateMe(@Body() dto: UpdateUserDto) {
    if (!Object.keys(dto).length) throw new BadRequestException(`empty data`);

    return this.usersService.updateMe(dto);
  }

  @Delete('/me')
  @HttpCode(204)
  deleteMe() {
    return this.usersService.deleteMe();
  }
}
