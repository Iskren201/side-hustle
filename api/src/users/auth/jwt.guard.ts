import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtCookieGuard implements CanActivate {
    constructor(private jwt: JwtService, private cfg: ConfigService) { }
    async canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest();
        const token = req.cookies?.sid;
        if (!token) throw new UnauthorizedException();
        try {
            req.user = await this.jwt.verifyAsync(token, { secret: this.cfg.get<string>('JWT_SECRET')! });
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}
