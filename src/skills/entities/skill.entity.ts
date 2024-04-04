import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SkillEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    designation:string;
}