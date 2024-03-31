import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { users } from 'src/drizzle/schema';
import { InferInsertModel } from 'drizzle-orm';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  createMS(createUserDto: InferInsertModel<typeof users>) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_users' })
  findAllMS() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user' })
  findOneMS(id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateMS({ id, ...rest }: Partial<InferInsertModel<typeof users>>) {
    return this.usersService.update(id, rest);
  }

  @MessagePattern({ cmd: 'delete_user' })
  removeMS(id: string) {
    return this.usersService.remove(id);
  }
}
