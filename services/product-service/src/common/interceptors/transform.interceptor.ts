import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  status: string;
  message?: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (data && typeof data === 'object' && 'message' in data) {
          const { message, ...rest } = data as Record<string, unknown>;
          return {
            success: true,
            status: 'success',
            message: String(message),
            data: rest as T,
          };
        }
        return {
          success: true,
          status: 'success',
          message: 'Operation successful',
          data: data as T,
        };
      }),
    );
  }
}
