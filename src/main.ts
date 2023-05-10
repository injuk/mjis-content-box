import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import commonConfig from 'src/config/common.config';
import { ConfigType } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: ConfigType<typeof commonConfig> = app.get(commonConfig.KEY);

  const port = isNaN(config.application.port) ? 3000 : config.application.port;
  await app.listen(port);

  const logger = new Logger('ApplicationBootStrap');
  logger.debug(`application port is [${port}]`);
  logger.debug(`application CORS is [on]`);
}
bootstrap();
