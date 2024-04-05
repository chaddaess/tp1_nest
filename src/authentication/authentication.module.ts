import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {PassportModule, PassportStrategy} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/passport-jwt.strategy";


@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService,JwtStrategy],
  imports:[
      JwtModule.register({
          signOptions:{expiresIn:3600}
      }),
      TypeOrmModule.forFeature(
          [User]
      ),
      PassportModule.register(
          {
              defaultStrategy:'jwt'
          }
      ),

  ]
})
export class AuthenticationModule {}
