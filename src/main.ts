import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { winstonTransport } from './config/transports/winston.transport';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const run = new Logger('NestApplication');
  const logger = WinstonModule.createLogger(winstonTransport);
  const app = await NestFactory.create(AppModule, { logger });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port, () => run.log(`API is running on port ${port}`));
}
bootstrap();
