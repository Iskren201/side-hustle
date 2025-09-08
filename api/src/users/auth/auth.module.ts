import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtCookieGuard } from './jwt.guard';
import { UsersModule } from '../users.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                secret: cfg.get<string>('JWT_SECRET')!,
                signOptions: { expiresIn: cfg.get('JWT_EXPIRES') || '7d' },
            }),
        }),
        ConfigModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtCookieGuard],
})
export class AuthModule { }
