import { NestFactory } from '@nestjs/core';
import {AppModule} from "../app.module";
import {
    randDirectoryPath,
    randEmail,
    randFirstName,
    randFullName,
    randJobTitle,
    randLastName,
    randPassword, randSkill
} from "@ngneat/falso";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {UsersService} from "../users/users.service";
import {SkillsService} from "../skills/skills.service";
import {CreateSkillDto} from "../skills/dto/create-skill.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {CvsService} from "../cvs/cvs.service";
import {CreateCvDto} from "../cvs/dto/create-cv.dto";


async function seedData() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userService:UsersService=app.get(UsersService)
    // let user:CreateUserDto=userService.randomize();
    // await userService.create(user);
    const skillService:SkillsService=app.get(SkillsService)
    // let skill:CreateSkillDto=skillService.randomize()
    // await  skillService.create(skill)
    const cvService:CvsService=app.get(CvsService)
    let cv:CreateCvDto=cvService.randomize();
    await cvService.create(cv);
    await app.close()
}
seedData();
