import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    username:string
    @PrimaryColumn()
    email:string
    @Column()
    password:string
    @Column()
    salt:string
    @Column()
    role?:string

}
