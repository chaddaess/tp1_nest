import {Inject, Injectable} from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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
  async create(createCvDto:CreateCvDto) {
    return await this.cvRepository.save(createCvDto)
  }
  randomize(){
    const  cv:CreateCvDto={
      id:randUuid(),
      name: randLastName(),
      firstName:randFirstName(),
      cin:randomStringGenerator(),
      job:randJobTitle(),
      path:randDirectoryPath(),
    }
    console.log(cv)
    return cv
  }

  findAll() {
    return `This action returns all cvs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }

}
