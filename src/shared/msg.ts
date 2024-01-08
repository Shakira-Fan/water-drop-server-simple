import Dysmsapi20180501 from '@alicloud/dysmsapi20180501';
import * as OpenApi from '@alicloud/openapi-client';

const config = new OpenApi.Config({
  // Required, your AccessKey ID
  accessKeyId: '',
  // Required, your AccessKey secret
  accessKeySecret: '',
});
// See https://api.alibabacloud.com/product/Dysmsapi.
config.endpoint = `dysmsapi.ap-southeast-1.aliyuncs.com`;
export const msgClient = new Dysmsapi20180501(config);
