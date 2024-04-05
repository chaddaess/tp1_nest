import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {version} from "eslint-plugin-prettier";
import {ValidationPipe, VersioningType} from "@nestjs/common";
import * as dotenv from 'dotenv';
import passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning(
      {
        type:VersioningType.URI
      }
  )
  await app.listen(3000);
}
bootstrap();
