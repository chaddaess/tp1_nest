import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {sha256} from "js-sha256";
import {LoginUserDto} from "./dto/login-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import process from "process";
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Injectable()
export class AuthenticationService {
  constructor(
      @InjectRepository(UserEntity)
      private userRepository:Repository<UserEntity>,
      private jwtService:JwtService
  )
  {}

  async create(createUserDto:CreateUserDto):Promise<UserEntity> {
    let username=createUserDto.username
    let email=createUserDto.email
    let existUsername:UserEntity=await this.userRepository.findOneBy({username:username})
    if(existUsername){
      throw new BadRequestException(`username ${username} already used`)
    }
    let existEmail:UserEntity=await this.userRepository.findOneBy({email:email})
    if(existEmail){
      throw new BadRequestException(`email ${email} already used`)
    }
    const salt=randomStringGenerator()
    let hashedPassword:string=sha256(createUserDto.password)+salt
    let user:CreateUserDto={
      username:username,
      email:email,
      role:"member",
      password:hashedPassword,
      salt:salt,
    }
    console.log(user);
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
      role:user.role
    }
    const jwt:string=this.jwtService.sign(payload,{secret:" "});
    return {
      access_token:jwt
    }
  }
}