import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Multer configuration
  const upload = multer({ dest: './uploads/' });

  // Set the payload size limit to 50 megabytes (or adjust it according to your requirements)
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Use multer for handling file uploads
  app.use(upload.any());

  await app.listen(3000);
}
bootstrap();
