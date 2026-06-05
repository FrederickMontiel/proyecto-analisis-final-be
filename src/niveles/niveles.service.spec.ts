import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegistroNivelService } from './niveles.service';
import { RegistroNivel } from '../entities/registro-nivel.entity';

describe('RegistroNivelService', () => {
  let service: RegistroNivelService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([
        {
          id_registro: 1,
          nivel_porcentaje: 85,
          nivel_litros: 10200,
          fecha_registro: new Date(),
        },
      ]),
      findOne: jest.fn().mockResolvedValue({
        id_registro: 1,
        nivel_porcentaje: 85,
        nivel_litros: 10200,
      }),
      save: jest.fn().mockResolvedValue({
        id_registro: 2,
        nivel_porcentaje: 80,
        nivel_litros: 9600,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistroNivelService,
        {
          provide: getRepositoryToken(RegistroNivel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RegistroNivelService>(RegistroNivelService);
  });

  describe('getNiveles', () => {
    it('should return array of niveles', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('crearNivel', () => {
    it('should create new nivel registro', async () => {
      const data = {
        id_tanque: 1,
        nivel_porcentaje: 80,
        nivel_litros: 9600,
        id_usuario: 4,
        observaciones: 'Test',
      };

      const result = await service.crear(data);
      expect(result).toBeDefined();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should validate nivel between 0-100', async () => {
      const invalidData = {
        id_tanque: 1,
        nivel_porcentaje: 150,
        nivel_litros: 18000,
        id_usuario: 4,
      };

      await expect(service.crear(invalidData)).rejects.toThrow();
    });
  });
});
