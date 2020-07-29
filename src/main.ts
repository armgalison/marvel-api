import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/public');

  const options = new DocumentBuilder()
    .setTitle('Marvel API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('v1/public/docs', app, document, { url: '/v1/public/' });

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
