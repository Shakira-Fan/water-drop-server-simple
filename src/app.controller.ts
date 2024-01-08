import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name:"水滴超級管理員",
      desc:"管理員",
      tel:"88800888",
      password:"123456",
      account:"admin",
    })
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('8588cc29-3aa3-4f1d-97ae-7022c7ac0992')
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update('f60236e4-529b-457c-a048-0654080dfb1c',{
      name:"水滴超級管理員123",
      desc:"管理員123",
    })
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('f60236e4-529b-457c-a048-0654080dfb1c')
  }
}
