import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule, PassportStrategy} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/passport-jwt.strategy";
import {RolesAuthGuard} from "./Guards/role-auth.guard";
import {JwtAuthGuard} from "./Guards/jwt-auth.guard";
import { UserEntity } from '../users/entities/user.entity';



@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService,JwtStrategy],
  imports:[
      JwtModule.register({
          signOptions:{expiresIn:3600}
      }),
      TypeOrmModule.forFeature(
          [UserEntity]
      ),
      PassportModule.register(
          {
              defaultStrategy:'jwt'
          }
      ),

  ],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}
