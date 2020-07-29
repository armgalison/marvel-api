import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class DuplicatedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(catchError(this.throwDuplicatedEntityError.bind(this)));
  }

  private throwDuplicatedEntityError(error) {
    console.error(error);
    
    if (error instanceof QueryFailedError) {
      throw new ConflictException('Already registered, please verify your payload.');
    }

    throw new NotAcceptableException('Please verify your payload', error.message);
  }
}
