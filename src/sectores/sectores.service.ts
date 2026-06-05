import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from '../entities/sector.entity';
import { Hogar } from '../entities/hogar.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private repo: Repository<Sector>,
    @InjectRepository(Hogar)
    private hogarRepo: Repository<Hogar>,
  ) {}

  async findAll() {
    const sectores = await this.repo.find();
    const result = [];
    for (const sector of sectores) {
      const hogares = await this.hogarRepo.count({ where: { id_sector: sector.id_sector } });
      result.push({ ...sector, numero_hogares: hogares });
    }
    return result;
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_sector: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  async create(data: Partial<Sector>) {
    try {
      return await this.repo.save(this.repo.create(data));
    } catch (error) {
      if (error.message?.includes('sector_nombre_sector_key')) {
        throw new ConflictException('No pueden existir dos sectores con el mismo nombre');
      }
      throw error;
    }
  }

  async update(id: number, data: Partial<Sector>) {
    try {
      await this.repo.update(id, data as any);
      return this.findOne(id);
    } catch (error) {
      if (error.message?.includes('sector_nombre_sector_key')) {
        throw new ConflictException('No pueden existir dos sectores con el mismo nombre');
      }
      throw error;
    }
  }

  async obtenerHogares(idSector: number) {
    const sector = await this.findOne(idSector);
    const hogaresAsignados = await this.hogarRepo.find({ where: { id_sector: idSector } });
    const todoHogares = await this.hogarRepo.find();

    return {
      sector: {
        ...sector,
        numero_hogares: hogaresAsignados.length,
      },
      hogares: todoHogares.map(h => ({
        ...h,
        asignado: hogaresAsignados.some(ha => ha.id_hogar === h.id_hogar),
      })),
    };
  }

  async asignarHogares(idSector: number, idsHogares: number[]) {
    await this.findOne(idSector);
    const hogaresActuales = await this.hogarRepo.find({ where: { id_sector: idSector } });
    const idActuales = hogaresActuales.map(h => h.id_hogar);
    const paraDesasignar = idActuales.filter(id => !idsHogares.includes(id));
    if (paraDesasignar.length > 0) {
      await this.hogarRepo.update(paraDesasignar, { id_sector: null });
    }
    for (const idHogar of idsHogares) {
      await this.hogarRepo.update(idHogar, { id_sector: idSector });
    }
    return this.obtenerHogares(idSector);
  }
}
