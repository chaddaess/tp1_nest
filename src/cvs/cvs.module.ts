import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import {CvsController, CvsControllerV2} from './cvs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CvEntity} from "./entities/cv.entity";
import {UserEntity} from "../users/entities/user.entity";

@Module({
  controllers: [CvsController,CvsControllerV2],
  providers: [CvsService],
  imports:[TypeOrmModule.forFeature(
      [CvEntity,UserEntity]
  )]
})
export class CvsModule {}
