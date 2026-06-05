import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HogarService } from './hogares.service';

@ApiTags('hogares')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('hogares')
export class HogarController {
  constructor(private service: HogarService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: any) { return this.service.update(+id, data); }
  @Delete(':id') delete(@Param('id') id: string) { return this.service.delete(+id); }
}
