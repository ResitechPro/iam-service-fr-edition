import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from 'src/drizzle/schema';
import { InferInsertModel } from 'drizzle-orm';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: InferInsertModel<typeof users>) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<InferInsertModel<typeof users>>,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @EventPattern('create_user')
  createMS(@Body() createUserDto: InferInsertModel<typeof users>) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_users' })
  findAllMS() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user' })
  findOneMS(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @EventPattern('update_user')
  updateMS(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<InferInsertModel<typeof users>>,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @EventPattern('delete_user')
  removeMS(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
