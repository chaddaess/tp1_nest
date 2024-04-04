import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {version} from "eslint-plugin-prettier";
import {VersioningType} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning(
      {
        type:VersioningType.URI
      }
  )
  await app.listen(3000);
}
bootstrap();
