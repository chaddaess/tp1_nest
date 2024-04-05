import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {version} from "eslint-plugin-prettier";
import {ValidationPipe, VersioningType} from "@nestjs/common";
import * as dotenv from 'dotenv';
import passport from "passport";
import {RolesAuthGuard} from "./authentication/Guards/role-auth.guard";
import {JwtAuthGuard} from "./authentication/Guards/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.useGlobalGuards(new JwtAuthGuard())
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning(
      {
        type:VersioningType.URI
      }
  )
    await app.listen(3000);
}
bootstrap();
