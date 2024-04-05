import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {sha256} from "js-sha256";
import {LoginUserDto} from "./dto/login-user.dto";
import * as process from "process";

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto){
      console.log(process.env.SECRET)
    // return this.authenticationService.create(createUserDto)
  }

  @Post('/login')
   login(@Body() loginUserDto: LoginUserDto){
    return  this.authenticationService.login(loginUserDto
    )
  }


}
