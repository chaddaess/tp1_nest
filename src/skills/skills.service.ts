import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {SkillEntity} from "./entities/skill.entity";
import {Repository} from "typeorm";
import {randSkill, randUuid} from "@ngneat/falso";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository:Repository<SkillEntity>
  ) {}

  randomize():CreateSkillDto{
    const skill:CreateSkillDto={
      id:randUuid(),
      designation:randSkill()
    }
    return skill;

  }
  async create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.save(createSkillDto)
  }

  findAll() {
    return `This action returns all skills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
