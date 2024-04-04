import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvsModule } from './cvs/cvs.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./cvs/entities/user.entity";
import {SkillEntity} from "./cvs/entities/skill.entity";
import {CvEntity} from "./cvs/entities/cv.entity";

@Module({
  imports: [
      CvsModule,
      TypeOrmModule.forRoot(
          {
            'type':"mysql",
            host:"localhost",
            port:3306,
            username:"",
            password:"",
            database:"nest_test",
            entities:[UserEntity,SkillEntity,CvEntity],
            synchronize:true
          }
      )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
