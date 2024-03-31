import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let rolesService: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
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

    controller = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call rolesService.create with the provided data', () => {
      const createRoleDto = { name: 'Test Role' };
      controller.create(createRoleDto);
      expect(rolesService.create).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('findAll', () => {
    it('should call rolesService.findAll', () => {
      controller.findAll();
      expect(rolesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call rolesService.findOne with the provided id', () => {
      const roleId = 'testRoleId';
      controller.findOne(roleId);
      expect(rolesService.findOne).toHaveBeenCalledWith(roleId);
    });
  });

  describe('update', () => {
    it('should call rolesService.update with the provided id and data', () => {
      const roleId = 'testRoleId';
      const updatedRoleData = { name: 'Updated Role' };
      controller.update({ id: roleId, ...updatedRoleData });
      expect(rolesService.update).toHaveBeenCalledWith(roleId, updatedRoleData);
    });
  });

  describe('remove', () => {
    it('should call rolesService.remove with the provided id', () => {
      const roleId = 'testRoleId';
      controller.remove(roleId);
      expect(rolesService.remove).toHaveBeenCalledWith(roleId);
    });
  });
});
