import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorators/user.decorator';
import { UserEntity } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@User() user : UserEntity): string {
    console.log(user);
    return this.appService.getHello();
  }
}
