import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    // 设置全局dto验证器
    app.useGlobalPipes(
        new ValidationPipe({
            // disableErrorMessages: true,
        }),
    );
    // 设置启用版本控制
    app.enableVersioning({
        type: VersioningType.URI,
    });
    // 设置全局路由前缀
    app.setGlobalPrefix('api');
    // 设置是否在nginx代理下，用于获取真实ip
    if (configService.get('APP_TRUST_PROXY') === 'true') {
        (app.getHttpAdapter() as any).instance.set('trust proxy', true);
    }
    await app.listen(+configService.get('APP_PORT'), '0.0.0.0');
}
bootstrap();
