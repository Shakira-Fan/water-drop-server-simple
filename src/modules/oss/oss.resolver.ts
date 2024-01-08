import { Query, Resolver } from '@nestjs/graphql';
import { OSSType } from './dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query(() => OSSType, { description: '獲取oss相關訊息' })
  async getOSSInfo(): Promise<OSSType> {
    return await this.ossService.getSignature();
  }
}
