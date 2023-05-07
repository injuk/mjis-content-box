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
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import commonConfig from '../config/common.config';
import { ConfigType } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserGuard } from './guard/user.guard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(UserGuard)
  @Get('/me')
  whoAmI(@Req() req) {
    return req.user;
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(UserGuard)
  @Patch('/me')
  @UsePipes(new ValidationPipe())
  updateMe(@Req() req, @Body() dto: UpdateUserDto) {
    if (!Object.keys(dto).length) throw new BadRequestException(`empty data`);

    return this.usersService.updateMe(req.user, dto);
  }

  @UseGuards(UserGuard)
  @Delete('/me')
  @HttpCode(204)
  deleteMe(@Req() req) {
    return this.usersService.deleteMe(req.user);
  }

  @Post('/sign-up')
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: SignUpDto) {
    return this.usersService.createUser(dto);
  }

  @Post('/sign-in')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  signIn(@Body() dto: SignInDto) {
    return this.usersService.signIn(dto);
  }
}
