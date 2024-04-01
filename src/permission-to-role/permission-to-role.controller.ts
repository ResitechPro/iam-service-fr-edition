import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionToRoleService } from './permission-to-role.service';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';

@Controller()
export class PermissionToRoleController {
  constructor(
    private readonly permissionToRoleService: PermissionToRoleService,
  ) {}

  @MessagePattern({ cmd: 'assign_permission_to_role' })
  assignPermissionToRole(@Payload() permissionToRoleDto: PermissionToRoleDto) {
    return this.permissionToRoleService.assignPermissionToRole(
      permissionToRoleDto,
    );
  }

  @MessagePattern({ cmd: 'remove_permission_from_role' })
  removePermissionFromRole(
    @Payload() permissionToRoleDto: PermissionToRoleDto,
  ) {
    return this.permissionToRoleService.removePermissionFromRole(
      permissionToRoleDto,
    );
  }
}
