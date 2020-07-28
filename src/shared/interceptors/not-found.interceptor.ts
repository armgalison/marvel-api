import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(catchError(this.throwNotFoundError.bind(this)));
  }

  private throwNotFoundError(error) {
    if (error instanceof EntityNotFoundError) {
      throw new NotFoundException(error.message);
    }

    throw new NotAcceptableException('Please verify your payload', error.message);
  }
}
