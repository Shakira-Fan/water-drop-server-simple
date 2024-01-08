import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '暱稱',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '描述',
    default: '',
  })
  desc: string;

  @Column({
    comment: '手機',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: '密碼',
    nullable: true,
  })
  password: string;

  @Column({
    comment: '帳號',
    nullable: true,
  })
  account: string;

  @Column({
    comment: '驗證碼',
    nullable: true,
  })
  code: string;

  @Column({
    comment: '驗證碼生成時間',
    nullable: true,
  })
  codeCreateTimeAt: Date;
}
