import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SectorService } from './sectores.service';

@ApiTags('sectores')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('sectores')
export class SectorController {
  constructor(private service: SectorService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Get(':id/hogares') obtenerHogares(@Param('id') id: string) { return this.service.obtenerHogares(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
  @Post(':id/asignar-hogares') asignarHogares(@Param('id') id: string, @Body() data: { idsHogares: number[] }) { return this.service.asignarHogares(+id, data.idsHogares); }
}