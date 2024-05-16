import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: '*',
    credentials: true,
  });  
  app.use(cors());
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
