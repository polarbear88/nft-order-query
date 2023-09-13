import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderAddDto } from './order.dto';
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
}
