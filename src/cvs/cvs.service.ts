import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DeepPartial, DeleteResult, Repository} from "typeorm";
import {CvEntity} from "./entities/cv.entity";
import {randDirectoryPath, randFirstName, randJobTitle, randLastName, randSkill, randUuid} from "@ngneat/falso";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {SkillEntity} from "../skills/entities/skill.entity";

@Injectable()
export class CvsService {
  constructor(
      @InjectRepository(CvEntity)
      private cvRepository:Repository<CvEntity>
  )
  {}

  randomize(){
    const  cv:CreateCvDto={
      id:randUuid(),
      name: randLastName(),
      firstName:randFirstName(),
      cin:randomStringGenerator(),
      job:randJobTitle(),
      path:randDirectoryPath(),
    }
    return cv
  }
  async create(createCvDto:CreateCvDto) {
    return await this.cvRepository.save(createCvDto)
  }


  async findAll() {
    return await this.cvRepository.find()
  }

  async findOne(id: string) {
    return await this.cvRepository.findOneBy({
      id:id,
    });
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

  async remove(id: string):Promise<DeleteResult> {
    const result= await this.cvRepository.delete(id)
    if(!result.affected){
      throw new NotFoundException(`cv d'id ${id} n'existe pas dans la base`)
    }else{
      return result
    }
  }

}
