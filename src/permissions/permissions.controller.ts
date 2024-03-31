import { Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { permissions } from 'src/drizzle/schema';
import { InferInsertModel } from 'drizzle-orm';
import { MessagePattern } from '@nestjs/microservices';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern({ cmd: 'create_permission' })
  create(createPermissionDto: InferInsertModel<typeof permissions>) {
    return this.permissionsService.create(createPermissionDto);
  }

  @MessagePattern({ cmd: 'get_permissions' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @MessagePattern({ cmd: 'get_permission' })
  findOne(id: string) {
    return this.permissionsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_permission' })
  update({ id, ...rest }: Partial<InferInsertModel<typeof permissions>>) {
    return this.permissionsService.update(id, rest);
  }

  @MessagePattern({ cmd: 'delete_permission' })
  remove(id: string) {
    return this.permissionsService.remove(id);
  }
}
