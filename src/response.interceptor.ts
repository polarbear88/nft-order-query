import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

/**
 * 拦截所有响应并封装数据来返回
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        // 强制设置响应状态码为200
        (context.switchToHttp().getResponse() as Response).status(HttpStatus.OK);
        // 设置禁止缓存
        (context.switchToHttp().getResponse() as Response).setHeader('Cache-Control', 'no-cache');
        (context.switchToHttp().getResponse() as Response).setHeader('Pragma', 'no-cache');
        (context.switchToHttp().getResponse() as Response).setHeader('Expires', '-1');
        // 修改响应内容以封装和加入基础数据
        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: HttpStatus.OK,
                    message: 'success',
                    data: this.serializeData(data),
                    timestamp: new Date().getTime(),
                };
            }),
        );
    }

    private serializeData(data: any) {
        if (data === null || data === undefined) {
            return null;
        }
        if (typeof data === 'object' && typeof data.toJson === 'function') {
            return data.toJson();
        }
        if (Array.isArray(data)) {
            return data.map((item) => {
                return this.serializeData(item);
            });
        }
        return data;
    }
}
