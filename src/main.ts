import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cors({
    origin: [
      'https://6645db355f5b3c000925af94--kanongaming-slot.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }));
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
