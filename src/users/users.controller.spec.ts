import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
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

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call userService.create with the provided data', () => {
      const createUserDto = {
        username: 'testUser',
        password: 'testPassword',
        roleId: 'testRoleId',
      };
      controller.create(createUserDto);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call userService.findAll', () => {
      controller.findAll();
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call userService.findOne with the provided id', () => {
      const userId = 'testUserId';
      controller.findOne(userId);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should call userService.update with the provided id and data', () => {
      const userId = 'testUserId';
      const updatedUserData = { username: 'Updated User' };
      controller.update({ id: userId, ...updatedUserData });
      expect(userService.update).toHaveBeenCalledWith(userId, updatedUserData);
    });
  });

  describe('remove', () => {
    it('should call userService.remove with the provided id', () => {
      const userId = 'testUserId';
      controller.remove(userId);
      expect(userService.remove).toHaveBeenCalledWith(userId);
    });
  });
});
