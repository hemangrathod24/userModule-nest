import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('User API')
  .setDescription('here are the API for User')
  .setVersion('1.0')
  .build();


  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('/',app,document);
  await app.listen(3000);
}
bootstrap();
