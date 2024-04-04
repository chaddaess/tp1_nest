import {NestMiddleware, UnauthorizedException} from "@nestjs/common";

export class AuthentificationMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void): any {
        let header=req.headers
        if(header.hasOwnProperty("auth-user")){
            let jwt=require('jsonwebtoken')
            let token=header['auth-user']
            let decoded=jwt.decode(token)
            if(decoded!==null){
                let userID:string=decoded['sub']
                req.userInfo={
                    "user-id":userID
                }
            }else {
                throw new UnauthorizedException("Vous n'êtes pas autorisé à accéder à cette ressource")
            }


        }else{
            throw new UnauthorizedException("Vous n'êtes pas autorisé à accéder à cette ressource")
        }
        next();

    }

}