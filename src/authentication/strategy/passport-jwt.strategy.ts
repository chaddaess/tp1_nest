import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import process from "process";
import {PayloadInterface} from "../Interfaces/payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository:Repository<UserEntity>,

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:" ",
        });
    }

    async validate(payload: PayloadInterface) {
        let user:UserEntity=await this.userRepository.findOneBy({username:payload.username})
        if(!user){
            throw new UnauthorizedException()
        }
        delete (user.salt)
        delete(user.password)
        // const {password,salt,...rest}=user
        return user
    }
}