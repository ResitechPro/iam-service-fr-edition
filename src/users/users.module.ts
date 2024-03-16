import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [UsersController],
  providers: [...drizzleProvider, UsersService],
})
export class UsersModule {}
