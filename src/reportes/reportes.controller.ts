import { Controller, Get, Query, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ReportesService } from './reportes.service';

@ApiTags('reportes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reportes')
export class ReportesController {
  constructor(private service: ReportesService) {}

  @Get('transparencia')
  async reporteTransparencia(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @Res() res: Response,
  ) {
    const pdf = await this.service.generarReporteTransparencia(fechaInicio, fechaFin);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="transparencia-${fechaInicio}-${fechaFin}.pdf"`,
    });
    res.end(pdf);
  }

  @Get('consumo')
  async reporteConsumo(@Query('mes') mes: string, @Res() res: Response) {
    const pdf = await this.service.generarReporteConsumo(mes);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="consumo-${mes}.pdf"`,
    });
    res.end(pdf);
  }
}
