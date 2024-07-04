import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SportEntity } from './entities/sport.entity';
import { SportService } from './sport.service';

describe('SportService', () => {
  let service: SportService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SportService,
        {
          provide: getRepositoryToken(SportEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SportService>(SportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a sport', async () => {
      const createSportDto = {
        name: 'Football',
        description: 'A team sport played with a spherical ball',
        type: 'Outdoor',
      };
      mockRepository.create.mockReturnValue(createSportDto);
      mockRepository.save.mockResolvedValue(createSportDto);
      expect(await service.create(createSportDto)).toEqual(createSportDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of sports', async () => {
      mockRepository.find.mockResolvedValue([
        { name: 'Football' },
        { name: 'Basketball' },
      ]);
      expect(await service.findAll()).toHaveLength(2);
    });

    it('should throw NotFoundException if no sports found', async () => {
      mockRepository.find.mockResolvedValue([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a sport by ID', async () => {
      const sport = { id: 1, name: 'Football' };
      mockRepository.findOne.mockResolvedValue(sport);
      expect(await service.findOne(1)).toEqual(sport);
    });

    it('should throw NotFoundException if sport not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a sport successfully', async () => {
      mockRepository.update.mockResolvedValue({ affected: 1 });
      expect(
        await service.update(1, {
          name: 'Updated Football',
          description: 'lorem ipsum',
          type: 'dolores',
        }),
      ).toEqual({
        affected: 1,
      });
    });

    it('should throw NotFoundException if sport not found', async () => {
      mockRepository.update.mockResolvedValue({ affected: 0 });
      const updateSportDto = {
        id: 50,
        name: 'Updated Name',
        description: 'Updated Description',
        type: 'Updated Type',
      };
      await expect(service.update(50, updateSportDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    describe('remove', () => {
      it('should remove a sport successfully', async () => {
        mockRepository.delete.mockResolvedValue({ affected: 1 });
        expect(await service.remove(1)).toEqual({ affected: 1 });
      });

      it('should throw NotFoundException if sport not found', async () => {
        mockRepository.delete.mockResolvedValue({ affected: 0 });
        await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      });
    });
  });
});
