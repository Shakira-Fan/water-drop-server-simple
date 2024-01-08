import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './models/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  //新增一個用戶
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  //刪除一個用戶
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  //更新一個用戶
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  //查詢一個用戶
  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  //查詢一個用戶 透過手機號碼
  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        tel,
      },
    });
    return res;
  }

  //更新一個用戶的驗證碼
  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreateTimeAt: new Date(),
    });
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
