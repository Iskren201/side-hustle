import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const cfg = app.get(ConfigService);

  const allowed = new Set(
    (cfg.get<string>('CORS_ORIGINS') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.replace(/\/$/, ''))
  );

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const norm = origin.replace(/\/$/, '');
      if (allowed.has(norm)) return cb(null, true);
      return cb(new Error(`CORS blocked for ${origin}`), false);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
  });

  app.setGlobalPrefix('api');

  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  app.use(cookieParser());
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = cfg.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
