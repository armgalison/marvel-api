import { Module } from '@nestjs/common';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';
import { DuplicatedInterceptor } from './interceptors/duplicated.interceptor';

@Module({
  providers: [
    NotFoundInterceptor,
    DuplicatedInterceptor
  ]
})
export class SharedModule {}
