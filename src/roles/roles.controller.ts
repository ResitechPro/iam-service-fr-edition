import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { InferInsertModel } from 'drizzle-orm';
import { roles } from 'src/drizzle/schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'create_role' })
  create(createRoleDto: InferInsertModel<typeof roles>) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern({ cmd: 'get_roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern({ cmd: 'get_role' })
  findOne(id: string) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_role' })
  update({ id, ...rest }: Partial<InferInsertModel<typeof roles>>) {
    return this.rolesService.update(id, rest);
  }

  @MessagePattern({ cmd: 'delete_role' })
  remove(id: string) {
    return this.rolesService.remove(id);
  }
}
