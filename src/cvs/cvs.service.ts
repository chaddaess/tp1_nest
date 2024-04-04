import {Inject, Injectable, NotFoundException, UnauthorizedException, Version} from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DeepPartial, DeleteResult, Repository} from "typeorm";
import {CvEntity} from "./entities/cv.entity";
import {
  randDirectoryPath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randSkill,
  randUuid
} from "@ngneat/falso";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {SkillEntity} from "../skills/entities/skill.entity";
import {UserEntity} from "../users/entities/user.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UpdateUserDto} from "../users/dto/update-user.dto";

@Injectable()
export class CvsService {
  constructor(
      @InjectRepository(CvEntity)
      private cvRepository:Repository<CvEntity>,
      @InjectRepository(UserEntity)
      private userRepository:Repository<UserEntity>

  )
  {}

  randomize(){
    const  cv:CreateCvDto={
      id:randUuid(),
      name: randLastName(),
      firstName:randFirstName(),
      age:Math.floor(Math.random()*100+1),
      cin:randomStringGenerator(),
      job:randJobTitle(),
      path:randDirectoryPath(),
    }
    return cv
  }
  async create(createCvDto:CreateCvDto) {
    return await this.cvRepository.save(createCvDto)
  }
  async createV2(createCvDto:CreateCvDto,userId:string){
    let user:UserEntity= await this.userRepository.findOneBy({id:userId })
    if(!user){
      throw new UnauthorizedException()
    }
    let cv:CvEntity=new CvEntity();
    cv={...createCvDto,user:user}
    return await this.cvRepository.save(cv);

  }



  async findAll() {
    return await this.cvRepository.find({relations:['user','skills']})
  }

  async findOne(id: string) {
    return await this.cvRepository.findOneBy({
      id:id,
    });
  }

  async find(age:number,chaine?:string){
      return this.cvRepository
          .createQueryBuilder('cv')
          .where('cv.age= :age', { age:age })
          .orWhere('cv.name LIKE :chaine', { chaine: `%${chaine}%` })
          .orWhere('cv.firstname LIKE :chaine', { chaine: `%${chaine}%` })
          .orWhere('cv.job LIKE :chaine', { chaine: `%${chaine}%` })
          .getMany();

  }


  async update(id: string, updateCvDto: DeepPartial<CvEntity>):Promise<CvEntity>{
    const cv=await this.cvRepository.preload({
      id:id,
      ...updateCvDto
    })
    if(!cv){
      throw  new NotFoundException(`cv d'id ${id} n'existe pas dans la base`)
    }
    return await this.cvRepository.save(cv)
  }

  async updateV2(id: string, updateCvDto: DeepPartial<CvEntity>,userId:string):Promise<CvEntity>{
    const cv:CvEntity=await this.cvRepository.findOne({
      where:{id:id},
      relations:['user']
    }
    );
    if(!cv){
      throw new NotFoundException(`cv d'id ${id} n'existe pas dans la base`)
    }
    let user:UserEntity= await this.userRepository.findOneBy({id:userId})
    if(!user ||!cv.user||cv.user.id!=user.id) {
      throw new UnauthorizedException()
    }
    const cvFinal={
      id:id,
      ...updateCvDto
    }
    return this.cvRepository.save(cvFinal)

  }

  async remove(id: string):Promise<DeleteResult> {
    const result= await this.cvRepository.delete(id)
    if(!result.affected){
      throw new NotFoundException(`cv d'id ${id} n'existe pas dans la base`)
    }else{
      return result
    }
  }
  async removeV2(id:string,userId:string):Promise<DeleteResult>{
    const cv:CvEntity=await this.cvRepository.findOne({
          where:{id:id},
          relations:['user']
        }
    );
    if(!cv){
      throw new NotFoundException(`cv d'id ${id} n'existe pas dans la base`)
    }
    let user:UserEntity= await this.userRepository.findOneBy({id:userId})
    console.log(cv)

    if(!user ||!cv.user||cv.user.id!=user.id) {
      throw new UnauthorizedException()
    }
    const result= await this.cvRepository.delete(id)
    if(!result.affected){
      throw new NotFoundException(`cv d'id ${id} n'existe pas dans la base`)
    }else{
      return result
    }


  }


}
