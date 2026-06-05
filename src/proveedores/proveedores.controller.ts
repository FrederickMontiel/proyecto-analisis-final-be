import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProveedoresService } from './proveedores.service';

@Controller('proveedores')
@UseGuards(JwtAuthGuard)
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  async crear(@Body() data: any) {
    return {
      statusCode: 201,
      message: 'Proveedor creado',
      data: await this.proveedoresService.crear(data),
    };
  }

  @Get()
  async obtenerTodos() {
    return {
      statusCode: 200,
      data: await this.proveedoresService.obtenerTodos(),
    };
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    return {
      statusCode: 200,
      data: await this.proveedoresService.obtenerPorId(id),
    };
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  async actualizar(@Param('id') id: number, @Body() data: any) {
    return {
      statusCode: 200,
      message: 'Proveedor actualizado',
      data: await this.proveedoresService.actualizar(id, data),
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Presidente')
  async desactivar(@Param('id') id: number) {
    return {
      statusCode: 200,
      message: 'Proveedor desactivado',
      data: await this.proveedoresService.desactivar(id),
    };
  }
}
