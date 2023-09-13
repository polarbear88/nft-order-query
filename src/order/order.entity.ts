import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, Index } from 'typeorm';

/**
 * 订单实体
 */
@Entity()
export class Order extends BaseEntity {
    /**
     * 手机号
     */
    @Index()
    @Column()
    mobile: string;

    /**
     * 平台名称
     */
    @Column({ nullable: true })
    platform: string;

    /**
     * 支付链接
     */
    @Column('text')
    payUrl: string;

    // 这些字段不会被序列化
    shield: string[] = ['updatedAt', 'id'];
}
