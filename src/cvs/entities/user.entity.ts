import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {CvEntity} from "./cv.entity";

@Entity()
export class UserEntity{
    @PrimaryColumn()
    id:number;
    @Column()
    username:string;
    @Column()
   email:string;
    @Column()
   password:string;
    @OneToMany(
        ()=>CvEntity,
        (cv:CvEntity)=>cv.user
    )
    cvs:CvEntity
}