import * as Dysmsapi from '@alicloud/dysmsapi20180501';
import Util, * as utils from '@alicloud/tea-util';
import { Injectable } from '@nestjs/common';
import { getRandomCode } from 'src/shared';
import { UserService } from '../user/user.service';
import { msgClient } from 'src/shared/msg';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //發送簡訊驗證碼
  async sendCodeMsg(tel: string): Promise<boolean> {
    const user = await this.userService.findByTel(tel);
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 60 * 1000) {
        return false;
      }
    }
    const code = getRandomCode();
    const sendMessageToGlobeRequest = new Dysmsapi.SendMessageToGlobeRequest({
      to: tel,
      message: `俊峰您的驗證碼是${code},請於五分鐘內完成驗證，莉莉提醒你不要坐太久屁股很痛。`,
    });
    const runtime = new utils.RuntimeOptions({});
    try {
      // Copy the code to run, please print the return value of the API by yourself.
      await msgClient.sendMessageToGlobeWithOptions(
        sendMessageToGlobeRequest,
        runtime,
      );
      if (user) {
        const result = this.userService.updateCode(user.id, code);
        if (result) {
          return true;
        }
        return false;
      }
      await this.userService.create({
        tel,
        code,
        codeCreateTimeAt: new Date(),
      });
    } catch (error) {
      // print error message
      console.log(error.message);
      // Please click on the link below for diagnosis.
      console.log(error.data['Recommend']);
      Util.assertAsString(error.message);
    }
  }
}
