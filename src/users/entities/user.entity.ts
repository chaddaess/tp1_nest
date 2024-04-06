import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CvEntity} from "../../cvs/entities/cv.entity";
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id?:string;
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

    cvs?:CvEntity
    @Column()
    @Exclude()
    salt?:string
    @Column()
    role?:string
}