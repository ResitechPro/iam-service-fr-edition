import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    permissionsService = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call permissionsService.create with the provided data', () => {
      const createPermissionDto = {
        resource: 'testResource',
        action: 'testAction',
      };
      controller.create(createPermissionDto);
      expect(permissionsService.create).toHaveBeenCalledWith(
        createPermissionDto,
      );
    });
  });

  describe('findAll', () => {
    it('should call permissionsService.findAll', () => {
      controller.findAll();
      expect(permissionsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call permissionsService.findOne with the provided id', () => {
      const permissionId = 'testPermissionId';
      controller.findOne(permissionId);
      expect(permissionsService.findOne).toHaveBeenCalledWith(permissionId);
    });
  });

  describe('update', () => {
    it('should call permissionsService.update with the provided id and data', () => {
      const permissionId = 'testPermissionId';
      const updatedPermissionData = { resource: 'Updated Permission' };
      controller.update({ id: permissionId, ...updatedPermissionData });
      expect(permissionsService.update).toHaveBeenCalledWith(
        permissionId,
        updatedPermissionData,
      );
    });
  });

  describe('remove', () => {
    it('should call permissionsService.remove with the provided id', () => {
      const permissionId = 'testPermissionId';
      controller.remove(permissionId);
      expect(permissionsService.remove).toHaveBeenCalledWith(permissionId);
    });
  });
});
