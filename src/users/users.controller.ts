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
  @UsePipes(new ValidationPipe({ transform: true }))
  signUp(@Body() dto: CreateUserDto) {
    return this.usersService.signUp(dto);
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() dto: SignInDto) {
    return this.usersService.signIn();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
