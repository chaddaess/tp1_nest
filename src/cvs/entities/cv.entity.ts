import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";
import {SkillEntity} from "./skill.entity";
import {UserEntity} from "./user.entity";

@Entity()
export class CvEntity {
    @PrimaryColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    firstname:string;
    @Column()
    cin:string;
    @Column()
    job:string;
    @Column()
    path:string;
    @ManyToMany(()=>SkillEntity)
    @JoinTable()
    skills:SkillEntity[]
    @ManyToOne(
        ()=>UserEntity,
        (user:UserEntity)=>user.cvs
    )
    user:UserEntity


}
