import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UsersService } from './users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const verified = this.verifyToken(request);
    if (!verified) throw new UnauthorizedException(`user must be authorized`);

    request.user = verified;

    return true;
  }

  private verifyToken(request: Request) {
    const authorization = request?.headers?.authorization;
    if (!authorization) return null;

    const jwtString = authorization.split('Bearer ').pop();

    return this.usersService.verify(jwtString);
  }
}
