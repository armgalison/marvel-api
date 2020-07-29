import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/public');
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
