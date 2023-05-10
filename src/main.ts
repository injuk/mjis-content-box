import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import commonConfig from 'src/config/common.config';
import { ConfigType } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: ConfigType<typeof commonConfig> = app.get(commonConfig.KEY);

  await app.listen(config.application.port ?? 3000);
}
bootstrap();
