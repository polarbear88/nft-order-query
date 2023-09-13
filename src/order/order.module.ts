import { Module, SetMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { RedisModule } from 'src/redis/redis.module';
import { MODULE_PATH } from '@nestjs/common/constants';

@SetMetadata(MODULE_PATH, 'order')
@Module({
    imports: [TypeOrmModule.forFeature([Order]), RedisModule],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule {}
