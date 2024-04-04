import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class SkillEntity{
    @PrimaryColumn()
    id:number;
    @Column()
    designation:string;
}