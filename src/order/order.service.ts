import { BaseService } from 'src/common/base/base.service';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { BadGatewayException } from '@nestjs/common';

export class OrderService extends BaseService<Order> {
    constructor(
        @InjectRepository(Order)
        private readonly repo: Repository<Order>,
        private readonly redis: RedisService,
    ) {
        super(repo);
    }

    /**
     * 增加订单
     * @param order 订单数据
     * @returns 订单实体
     */
    async addOrder(order: Partial<Order>): Promise<Order> {
        return await this.repo.save(order);
    }

    /**
     * 添加订单到缓存
     * @param order 订单数据
     */
    async addOrderToCache(order: Order): Promise<void> {
        const count = await this.redis.lpush(order.mobile + '-order', JSON.stringify(order));
        if (count <= 0) {
            throw new BadGatewayException('订单添加到缓存失败');
        }
    }

    async queryFromCache(mobile: string): Promise<Order[]> {
        // 仅查询最近100条订单
        const orders = await this.redis.lrange(mobile + '-order', 0, 100);
        return orders.map((order) => new Order().fromJson(order));
    }
}
