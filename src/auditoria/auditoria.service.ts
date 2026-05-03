import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAuditoria } from '../entities/log-auditoria.entity';

@Injectable()
export class LogAuditoriaService {
  constructor(
    @InjectRepository(LogAuditoria)
    private repo: Repository<LogAuditoria>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id_log: id } as any });
    if (!item) throw new NotFoundException('Registro no encontrado');
    return item;
  }

  create(data: Partial<LogAuditoria>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<LogAuditoria>) {
    await this.repo.update(id, data as any);
    return this.findOne(id);
  }
}// Log inmutable: usuario, accion, tabla, valor_anterior, valor_nuevo, ip
