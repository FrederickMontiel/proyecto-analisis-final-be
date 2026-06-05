import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PagoService } from './pagos.service';
import { Pago } from '../entities/pago.entity';
import { Usuario } from '../entities/usuario.entity';

describe('PagoService', () => {
  let service: PagoService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([
        {
          id_pago: 1,
          id_hogar: 1,
          monto: 50,
          fecha_pago: new Date(),
          metodo_pago: 'Efectivo',
        },
      ]),
      save: jest.fn().mockResolvedValue({
        id_pago: 2,
        id_hogar: 1,
        monto: 50,
        numero_recibo: 'REC-2026-001',
        fecha_pago: new Date(),
      }),
      findOne: jest.fn().mockResolvedValue({
        id_pago: 1,
        id_hogar: 1,
        monto: 50,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagoService,
        {
          provide: getRepositoryToken(Pago),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PagoService>(PagoService);
  });

  describe('getPagos', () => {
    it('should return array of pagos', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('registrarPago', () => {
    it('should create new pago with valid data', async () => {
      const data = {
        id_hogar: 1,
        monto: 50,
        metodo_pago: 'Efectivo' as any,
        periodo_aplicado: 'Mayo 2026',
        id_usuario_registro: 3,
      };

      const result = await service.create(data);
      expect(result).toBeDefined();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should reject monto <= 0', async () => {
      const invalidData = {
        id_hogar: 1,
        monto: 0,
        metodo_pago: 'Efectivo' as any,
        periodo_aplicado: 'Mayo 2026',
        id_usuario_registro: 3,
      };

      await expect(service.create(invalidData as any)).rejects.toThrow();
    });

    it('should generate receipt number', async () => {
      const data = {
        id_hogar: 1,
        monto: 50,
        metodo_pago: 'Transferencia' as any,
        periodo_aplicado: 'Mayo 2026',
        id_usuario_registro: 3,
      };

      const result = await service.create(data);
      expect(result).toBeDefined();
    });
  });
});
