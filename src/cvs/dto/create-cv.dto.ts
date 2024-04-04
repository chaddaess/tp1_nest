import {SkillEntity} from "../../skills/entities/skill.entity";
import {UserEntity} from "../../users/entities/user.entity";

export class CreateCvDto {
    id: string;

    name: string;

    firstName: string;
    age:number;

    cin: string;

    job: string;

    path: string;

    user?:UserEntity;

}
