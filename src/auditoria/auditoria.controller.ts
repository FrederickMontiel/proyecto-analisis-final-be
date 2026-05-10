import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LogAuditoriaService } from './auditoria.service';

@ApiTags('auditoria')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('auditoria')
export class LogAuditoriaController {
  constructor(private service: LogAuditoriaService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
}// Log auditoria flutter: tabla filtrable por usuario, tabla, fecha, exportar Excel
