import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { SignInDto } from './dto/sign-in.dto';
import * as jwt from 'jsonwebtoken';
import commonConfig from '../config/common.config';
import { ConfigType } from '@nestjs/config';
import { User } from './domain/authorized-user.entity';

@Injectable()
export class UsersService {
  private readonly secret;
  private readonly expiresIn;
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(commonConfig.KEY) private config: ConfigType<typeof commonConfig>,
    private readonly repository: UsersRepository,
  ) {
    this.secret = this.config.auth.jwtSecret;
    this.expiresIn = this.config.auth.expiresIn;
  }

  async getUserById(id: number) {
    const result = await this.repository.getUserById(id);
    if (!result) throw new NotFoundException(`user_id(${id})`);

    return result;
  }

  updateMe(user, dto: UpdateUserDto) {
    // TODO: 로그인 기능 구현 후 수정 필요
    const id = user.id;
    this.logger.debug(`user(${id}) try to update user information`);
    if (!id) throw new BadRequestException(`id should not be empty`);

    return this.repository.updateMe(id, dto);
  }

  deleteMe(user) {
    // TODO: 로그인 기능 구현 후 수정 필요
    const id = user.id;
    if (!id) throw new BadRequestException(`id should not be empty`);

    return this.repository.deleteMe(id);
  }

  createUser(dto: CreateUserDto) {
    return this.repository.createUser(dto);
  }

  getUserForSignIn(email: string, password: string) {
    return this.repository.getUserForSignIn(email, password);
  }

  async signIn(dto: SignInDto) {
    const user = await this.getUserForSignIn(dto.email, dto.password);
    if (!user) throw new UnauthorizedException(`invalid email or password`);

    const { password, ...userData } = user;

    const token = jwt.sign(userData, this.secret, {
      expiresIn: this.expiresIn,
      audience: userData.email,
      issuer: 'mJis.com',
    });
    return { token: `Bearer ${token}` };
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.secret) as (
        | jwt.JwtPayload
        | string
      ) &
        User;

      const { id, email, role, nickname, exp } = payload;

      return {
        id,
        email,
        role,
        nickname,
        expiredAt: exp,
      };
    } catch (e) {
      return false;
    }
  }
}
