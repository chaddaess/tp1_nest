import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
import {CreateUserDto} from "./create-user.dto";

export class LoginUserDto extends PartialType(CreateUserDto){
    @IsNotEmpty({
        message:"le champs  $property est obligatoire"
    })
    @IsEmail()
    email: string
    @IsNotEmpty({
        message:"le champs $property  est obligatoire"
    })
    @MinLength(6, {
            message: "la taile de votre $property $value est inférieure à la valeur minimale requise ($constraint1)"
        }
    )
    password: string
}