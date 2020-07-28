import { Module } from '@nestjs/common';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

@Module({
  providers: [ NotFoundInterceptor ]
})
export class SharedModule {}
