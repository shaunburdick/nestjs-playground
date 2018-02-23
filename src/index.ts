import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';

const { name, description, version } = require('../package');

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle('Blog Example')
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3001);
}
bootstrap();
