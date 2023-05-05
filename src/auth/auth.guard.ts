import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.verifyToken(request);
    if (!token) throw new UnauthorizedException(`invalid authorization`);

    return true;
  }

  private verifyToken(request: Request) {
    const jwtString = request.headers.authorization.split('Bearer ').at(1);

    return this.authService.verify(jwtString);
  }
}
