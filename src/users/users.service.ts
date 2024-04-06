import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {randEmail, randFullName, randPassword, randUuid} from "@ngneat/falso";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(UserEntity)
      private UserRepository:Repository<UserEntity>
  )
  {}
  async create(createUserDto: CreateUserDto) {
    return  await this.UserRepository.save(createUserDto)
  }
  randomize(){
    const user:CreateUserDto = {
      email: randEmail(),
      username: randFullName(),
      password:randPassword()
    };
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
