import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class OrderAddDto {
    @IsNotEmpty({ message: '访问令牌错误' })
    @IsString({ message: '访问令牌错误' })
    ticket: string;

    @IsNotEmpty({ message: '手机号不能为空' })
    @IsString({ message: '手机号必须为字符串' })
    @MaxLength(255, { message: '手机号长度不能超过255字节' })
    mobile: string;

    @IsNotEmpty({ message: '平台名称不能为空' })
    @IsString({ message: '平台名称必须为字符串' })
    @MaxLength(255, { message: '平台名称长度不能超过255字节' })
    platform: string;

    @IsNotEmpty({ message: '支付链接不能为空' })
    @IsString({ message: '支付链接必须为字符串' })
    payUrl: string;
}
