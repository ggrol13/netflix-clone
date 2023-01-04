import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { log } from 'util';

export interface Response<T> {
  data: T;
}

export interface ResponseService {
  success: true | false;
  data: any | null;
  error: any | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        success: true,
        data,
      })),
    );
  }
}
