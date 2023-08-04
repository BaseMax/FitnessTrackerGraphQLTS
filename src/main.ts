import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = parseInt(process.env.PORT);
  await app.listen(port);

  console.info(`API documentation: http://localhost:${port}/graphql`);
}
bootstrap();
