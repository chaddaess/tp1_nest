import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {sha256} from "js-sha256";
import {LoginUserDto} from "./dto/login-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import process from "process";


@Injectable()
export class AuthenticationService {
  constructor(
      @InjectRepository(User)
      private userRepository:Repository<User>,
      private jwtService:JwtService
  )
  {}

  async create(createUserDto:CreateUserDto):Promise<User> {
    let username=createUserDto.username
    let email=createUserDto.email
    let existUsername:User=await this.userRepository.findOneBy({username:username})
    if(existUsername){
      throw new BadRequestException(`username ${username} already used`)
    }
    let existEmail:User=await this.userRepository.findOneBy({email:email})
    if(existEmail){
      throw new BadRequestException(`email ${email} already used`)
    }
    const salt=randomStringGenerator()
    let hashedPassword:string=sha256(createUserDto.password)+salt
    let user:User={
      ...createUserDto,
      password:hashedPassword,
      salt:salt,
    }
    return await this.userRepository.save(user)
  }

  async login(loginUserDto: LoginUserDto){
    let user=await this.userRepository.findOneBy({email:loginUserDto.email})
    if(!user){
      throw new BadRequestException("aucun compte ne correspond à cet email")
    }
    let salt=user.salt;
    let hashedPassword=sha256(loginUserDto.password)+salt;
    if(hashedPassword!==user.password){
      throw new BadRequestException("mot de passe incorrect")
    }
    let payload={
      email:user.email,
      username:user.username,
    }
    const jwt:string=this.jwtService.sign(payload,{secret:" "});
    return {
      access_token:jwt
    }
  }
}