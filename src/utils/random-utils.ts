import {
    randDirectoryPath,
    randEmail,
    randFirstName,
    randFullName,
    randJobTitle,
    randLastName,
    randPassword, randSkill
} from '@ngneat/falso'
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
const user = {
    email: randEmail(),
    name: randFullName(),
    password:randPassword()
};
const cv={
    name: randLastName(),
    firstName:randFirstName(),
    cin:randomStringGenerator(),
    job:randJobTitle(),
    path:randDirectoryPath()
}
const skill={
    designation:randSkill()
}
console.log(cv);

