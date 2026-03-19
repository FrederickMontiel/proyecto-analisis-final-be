import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnuncioController } from './anuncios.controller';
import { AnuncioService } from './anuncios.service';
import { Anuncio } from '../entities/anuncio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio])],
  controllers: [AnuncioController],
  providers: [AnuncioService],
  exports: [AnuncioService],
})
export class AnuncioModule {}