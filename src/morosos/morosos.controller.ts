import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MorososService } from './morosos.service';

@ApiTags('morosos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('morosos')
export class MorososController {
  constructor(private service: MorososService) {}

  @Get()
  obtenerMorosos() {
    return this.service.obtenerMorosos();
  }
}
