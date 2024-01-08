import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OSSType {
  @Field({ description: '過期時間' })
  expire: string;
  @Field({ description: '策略' })
  policy: string;
  @Field({ description: '簽名' })
  signature: string;
  @Field({ description: 'key' })
  accessId: string;
  @Field({ description: 'host' })
  host: string;
}
