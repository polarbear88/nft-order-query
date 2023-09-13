import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // 拦截所有异常并封装数据来返回
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        let message = exception.message;
        if (exception.getResponse() instanceof Object && (exception.getResponse() as any).message) {
            message = (exception.getResponse() as any).message;
            if ((message as any) instanceof Array) {
                message = message[0];
            }
        }
        const resData = {
            statusCode: status,
            message: message,
            data: (exception as any).response ? (exception as any).response.data || {} : {},
            timestamp: new Date().getTime(),
        };
        // 设置禁止缓存
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '-1');
        response.status(HttpStatus.OK).json(resData);
    }
}
