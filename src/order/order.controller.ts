import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderAddDto, OrderQueryDto } from './order.dto';
import { ConfigService } from '@nestjs/config';

@Controller({ version: '1' })
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private configService: ConfigService,
    ) {}

    @Post('add')
    async add(@Body() dto: OrderAddDto) {
        const ticket = this.configService.get('ORDER_ACCESS_TOKEN');
        if (ticket !== dto.ticket) {
            throw new BadRequestException('访问令牌错误');
        }
        delete dto.ticket;
        const order = await this.orderService.addOrder(dto);
        await this.orderService.addOrderToCache(order);
        return null;
    }

    @Post('query')
    async query(@Body() dto: OrderQueryDto) {
        const orders = await this.orderService.queryFromCache(dto.mobile);
        if (orders.length === 0) {
            throw new NotFoundException('没有查询到订单');
        }
        return orders;
    }

    @Post('remakeCache')
    async remakeCache(@Body('ticket') t: string) {
        const ticket = this.configService.get('ORDER_ACCESS_TOKEN');
        if (ticket !== t) {
            throw new BadRequestException('访问令牌错误');
        }
        await this.orderService.remakeCache();
        return null;
    }
}
