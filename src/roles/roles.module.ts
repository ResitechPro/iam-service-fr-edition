import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [RolesController],
  providers: [...drizzleProvider, RolesService],
})
export class RolesModule {}
