import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [UsersModule, AuthorizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
