import {MiddlewareConsumer, Module, NestMiddleware, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvsModule } from './cvs/cvs.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CvEntity} from "./cvs/entities/cv.entity";
import { SkillsModule } from './skills/skills.module';
import { UsersModule } from './users/users.module';
import {UserEntity} from "./users/entities/user.entity";
import {SkillEntity} from "./skills/entities/skill.entity";
import {AuthentificationMiddleware} from "./cvs/authentification.middleware";

@Module({
  imports: [
      CvsModule,
      TypeOrmModule.forRoot(
          {
            'type':"mysql",
            host:"localhost",
            port:3306,
            username:"root",
            password:"",
            database:"nest_test",
            entities:[UserEntity,SkillEntity,CvEntity],
            synchronize:true,
          }
      ),
      SkillsModule,
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthentificationMiddleware)
            .forRoutes('/v2/cvs')
    }

}
