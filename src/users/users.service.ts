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
import * as bcrypt from 'bcryptjs';

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
    const id = user.id;
    this.logger.debug(`user(${id}) try to update user information`);
    if (!id) throw new BadRequestException(`id should not be empty`);

    return this.repository.updateMe(id, dto);
  }

  deleteMe(user) {
    const id = user.id;
    if (!id) throw new BadRequestException(`id should not be empty`);

    return this.repository.deleteMe(id);
  }

  async createUser(dto: CreateUserDto) {
    const { password } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.repository.createUser({ ...dto, password: hashedPassword });
  }

  async signIn(dto: SignInDto) {
    const user = await this.repository.getUserByEmail(dto.email);
    if (!user) throw new UnauthorizedException(`invalid email or password`);

    const isValidPassword = await bcrypt.compare(dto.password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException(`invalid email or password`);

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
