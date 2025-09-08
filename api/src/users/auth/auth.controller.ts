import { Body, Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtCookieGuard } from './jwt.guard';
import { LoginDto } from 'src/dto/auth/login-dto';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService, private cfg: ConfigService) { }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const user = await this.auth.validate(dto.email, dto.password);
        const token = await this.auth.signUser(user);

        const secure = this.cfg.get<boolean>('COOKIE_SECURE') ?? false;
        const sameSite: any = secure ? 'none' : 'lax';
        res.cookie('sid', token, { httpOnly: true, secure, sameSite, maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' });

        return { _id: user._id, email: user.email, fullName: user.fullName, roles: user.roles };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        const secure = this.cfg.get<boolean>('COOKIE_SECURE') ?? false;
        const sameSite: any = secure ? 'none' : 'lax';
        res.clearCookie('sid', { httpOnly: true, secure, sameSite, path: '/' });
        return { ok: true };
    }

    @Get('me')
    @UseGuards(JwtCookieGuard)
    me(@Req() req: Request) {
        return req.user;
    }
}
