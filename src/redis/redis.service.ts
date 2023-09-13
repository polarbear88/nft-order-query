import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async get(key: string): Promise<string | null> {
        return await this.redis.get(key);
    }

    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
            return await this.redis.set(key, value, 'EX', ttl);
        }
        return await this.redis.set(key, value);
    }

    async del(key: string) {
        return await this.redis.del(key);
    }

    async lpush(key: string, value: string) {
        return await this.redis.lpush(key, value);
    }

    async lpushArray(key: string, values: string[]) {
        return await this.redis.lpush(key, ...values);
    }

    async lrange(key: string, start: number, stop: number) {
        return await this.redis.lrange(key, start, stop);
    }

    async lrem(key: string, count: number, value: string) {
        return await this.redis.lrem(key, count, value);
    }

    async lpop(key: string) {
        return await this.redis.lpop(key);
    }

    async lindex(key: string, index: number) {
        return await this.redis.lindex(key, index);
    }

    async incr(key: string) {
        return await this.redis.incr(key);
    }

    async decr(key: string) {
        return await this.redis.decr(key);
    }

    async exists(key: string) {
        return await this.redis.exists(key);
    }

    async ttl(key: string) {
        return await this.redis.ttl(key);
    }

    async llen(key: string) {
        return await this.redis.llen(key);
    }

    async ltrim(key: string, start: number, stop: number) {
        return await this.redis.ltrim(key, start, stop);
    }

    async hset(key: string, field: string, value: string) {
        return await this.redis.hset(key, field, value);
    }

    async hget(key: string, field: string) {
        return await this.redis.hget(key, field);
    }

    async hdel(key: string, field: string) {
        return await this.redis.hdel(key, field);
    }

    async hgetall(key: string) {
        return await this.redis.hgetall(key);
    }

    async hlen(key: string) {
        return await this.redis.hlen(key);
    }

    async hkeys(key: string) {
        return await this.redis.hkeys(key);
    }

    async hvals(key: string) {
        return await this.redis.hvals(key);
    }

    async hexists(key: string, field: string) {
        return await this.redis.hexists(key, field);
    }

    async setex(key: string, seconds: number, value: string) {
        return await this.redis.setex(key, seconds, value);
    }

    async expire(key: string, seconds: number) {
        return await this.redis.expire(key, seconds);
    }

    getClient(): Redis {
        return this.redis;
    }
}
