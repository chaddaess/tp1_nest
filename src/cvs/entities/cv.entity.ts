import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {SkillEntity} from "../../skills/entities/skill.entity";
import {UserEntity} from "../../users/entities/user.entity";

@Entity()
export class CvEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    firstName:string;
    @Column()
    age:number
    @Column()
    cin:string;
    @Column()
    job:string;
    @Column()
    path:string;
    @ManyToMany(()=>SkillEntity,{ cascade: true })
    @JoinTable()
    skills?:SkillEntity[]
    @ManyToOne(
        ()=>UserEntity,
        (user:UserEntity)=>user.cvs,
{ cascade: true,lazy:false}
    )
    user:UserEntity



}
