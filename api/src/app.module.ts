import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envValidationSchema } from './config/env.validation';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
const nodeEnv = process.env.NODE_ENV ?? 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${nodeEnv}.local`,
        `.env.${nodeEnv}`,
        '.env',
      ],
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: false, allowUnknown: true },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGODB_URI')!,
        dbName: 'side_hustle', // името след / в URI също работи – това е резервно
      }),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
