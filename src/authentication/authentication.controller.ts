import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {sha256} from "js-sha256";
import {LoginUserDto} from "./dto/login-user.dto";
import * as process from "process";
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto){
     return this.authenticationService.create(createUserDto)
  }

  @Post('/login')
   login(@Body() loginUserDto: LoginUserDto){
    return  this.authenticationService.login(loginUserDto
    )
  }


}
