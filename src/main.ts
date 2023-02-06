import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import commonConfig from 'src/config/common.config';
import { ConfigType } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigType<typeof commonConfig> = app.get(commonConfig.KEY);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(config.application.port ?? 3000);
}
bootstrap();
